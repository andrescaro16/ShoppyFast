package controllers

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func executeAggregateQuery(invoices_collection *mongo.Collection, pipeline mongo.Pipeline) ([]bson.M, error) {
	// Ejecutar la consulta
	var queryResults []bson.M
	cursor, err := invoices_collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return queryResults, err
	}
	defer cursor.Close(context.Background())
	if err := cursor.All(context.Background(), &queryResults); err != nil {
		return queryResults, err
	}
	return queryResults, nil
}

func getNotSelledProductQueryMongo(date_to_analize_UTC time.Time, next_date_to_analize_UTC time.Time, invoices_collection *mongo.Collection) ([]bson.M, error) {
	// Definir el pipeline de agregación
	pipeline := mongo.Pipeline{
		bson.D{{"$match", bson.D{{"timestamp", bson.D{{"$gte", date_to_analize_UTC}, {"$lt", next_date_to_analize_UTC}}}}}},
		bson.D{{"$unwind", "$products"}},
		bson.D{{"$group", bson.D{{"_id", "$products.id"}}}},
		bson.D{{"$group", bson.D{{"_id", 0}, {"product_ids", bson.D{{"$push", "$_id"}}}}}},
		bson.D{
			{"$lookup", bson.D{
				{"from", "products"},
				{"let", bson.D{{"product_ids", "$product_ids"}}},
				{"pipeline", bson.A{
					bson.D{
						{"$match", bson.D{
							{"$expr", bson.D{
								{"$not", bson.D{
									{"$in", bson.A{"$id", "$$product_ids"}},
								}},
							}},
						}},
					},
				}},
				{"as", "products"},
			}},
		},
		bson.D{{"$project", bson.D{{"not_selled_products", "$products"}}}},
	}

	return executeAggregateQuery(invoices_collection, pipeline)
}

func getSellingProductQueryMongoHelper(date_to_analize_UTC time.Time, next_date_to_analize_UTC time.Time, invoices_collection *mongo.Collection, sortDirection int) ([]bson.M, error) {
	// Definir el pipeline de agregación
	pipeline := mongo.Pipeline{
		bson.D{{"$match", bson.D{{"timestamp", bson.D{{"$gte", date_to_analize_UTC}, {"$lt", next_date_to_analize_UTC}}}}}},
		bson.D{{"$unwind", "$products"}},
		bson.D{{"$group", bson.D{{"_id", "$products.id"}, {"cantidad", bson.D{{"$sum", "$products.cantidad"}}}}}},
		bson.D{{"$sort", bson.D{{"cantidad", sortDirection}}}},
		bson.D{{"$limit", 3}},
	}
	return executeAggregateQuery(invoices_collection, pipeline)
}

func getBestSellingProductQueryMongo(date_to_analize_UTC time.Time, next_date_to_analize_UTC time.Time, invoices_collection *mongo.Collection) ([]bson.M, error) {
	return getSellingProductQueryMongoHelper(date_to_analize_UTC, next_date_to_analize_UTC, invoices_collection, -1)
}

func getLessSellingProductQueryMongo(date_to_analize_UTC time.Time, next_date_to_analize_UTC time.Time, invoices_collection *mongo.Collection) ([]bson.M, error) {
	return getSellingProductQueryMongoHelper(date_to_analize_UTC, next_date_to_analize_UTC, invoices_collection, 1)
}

func getDateToAnalizeUTC(c *fiber.Ctx) (time.Time, error) {
	//Obtengo la fecha de la semana que se quiere analizar
	var bodyRequestData = struct {
		Date_to_analize string `json:"date_to_analize"`
	}{}
	if err_bodyParser := c.BodyParser(&bodyRequestData); err_bodyParser != nil {
		return time.Time{}, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_bodyParser, "concluded": false, "message": "There was an error getting the body reques"})
	}
	date_to_analize, err_parsing_date_to_analize := time.Parse(time.RFC3339, bodyRequestData.Date_to_analize)
	if err_parsing_date_to_analize != nil {
		return time.Time{}, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_parsing_date_to_analize, "concluded": false, "message": "There was an error parsing the date"})
	}
	date_to_analize_UTC := date_to_analize.UTC()

	// Calcula la cantidad de días necesarios para llegar al lunes
	days_until_monday := int(time.Monday - date_to_analize_UTC.Weekday())
	// calcula la fecha del lunes
	date_to_analize_UTC = date_to_analize_UTC.AddDate(0, 0, days_until_monday)
	// ajusta la hora a las 00:00:00
	date_to_analize_UTC = date_to_analize_UTC.Truncate(24 * time.Hour)
	return date_to_analize_UTC, nil
}

func GenerateBarChart(bar_items [3][7]opts.BarData, c *fiber.Ctx, title string, seriename string) ([]byte, error) {
	chart_bar := charts.NewBar()
	chart_bar.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{Title: title, Subtitle: "Pasa el mouse encima de cada vela para obtener mas informacion"}),
		charts.WithTooltipOpts(opts.Tooltip{Show: true}),
		charts.WithLegendOpts(opts.Legend{Show: true, Right: "80px"}),
	)
	chart_bar.SetXAxis([]string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}).
		AddSeries(fmt.Sprintf(seriename, 1), bar_items[0][:]).
		AddSeries(fmt.Sprintf(seriename, 2), bar_items[1][:]).
		AddSeries(fmt.Sprintf(seriename, 3), bar_items[2][:])

	f, _ := os.Create("bar.html")
	chart_bar.Render(f)

	// Lee el archivo HTML generado
	chartHTML, err := ioutil.ReadFile("bar.html")
	if err != nil {
		return nil, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error reading the html file"})
	}
	err = os.Remove("bar.html")
	if err != nil {
		return nil, c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error removing the html file"})
	}
	return chartHTML, nil
}

func GetBestSellingProductChart(c *fiber.Ctx, db *mongo.Database) error {

	date_to_analize_UTC, err := getDateToAnalizeUTC(c)

	if err != nil {
		return err
	}

	// Obtener una referencia a la colección de facturas
	invoices_collection := db.Collection("invoices")
	var bar_items [3][7]opts.BarData

	for i := 0; i < 7; i++ {

		next_date_to_analize_UTC := date_to_analize_UTC.AddDate(0, 0, 1)
		best_selling_product, err_getting_best_selling_pruduct := getBestSellingProductQueryMongo(date_to_analize_UTC, next_date_to_analize_UTC, invoices_collection)
		if err_getting_best_selling_pruduct != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_getting_best_selling_pruduct, "concluded": false, "message": "There was an error getting the best selling product from Mongo"})
		}
		var lenProducts = len(best_selling_product)
		if lenProducts == 0 {
			date_to_analize_UTC = next_date_to_analize_UTC
			continue
		}

		for j := 0; j < lenProducts; j++ {
			var product_id int = int(best_selling_product[j]["_id"].(int32))
			var product_quantity int = int(best_selling_product[j]["cantidad"].(int32))
			products, err := GetProductByIdHelper(product_id, db)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error getting the product from database"})
			}
			bar_items[j][i].Value = product_quantity
			bar_items[j][i].Name = products[0].Name + "- Cantidad vendida"
		}
		date_to_analize_UTC = next_date_to_analize_UTC
	}

	chartHTML, err := GenerateBarChart(bar_items, c, "Productos mas vendidos cada dia", "#%d Mas vendido ")
	if err != nil {
		return err
	}
	return c.Status(fiber.StatusOK).Send(chartHTML)
}

// Get the 3 less selling products per day in a week
func GetLessSalingProductReport(c *fiber.Ctx, db *mongo.Database) error {

	date_to_analize_UTC, err := getDateToAnalizeUTC(c)

	if err != nil {
		return err
	}

	// Obtener una referencia a la colección de facturas
	invoices_collection := db.Collection("invoices")

	var bar_items [3][7]opts.BarData
	var unsoldProducts [7][]models.Product

	for i := 0; i < 7; i++ {

		next_date_to_analize_UTC := date_to_analize_UTC.AddDate(0, 0, 1)
		unsoldProductsQueryResult, errGettingUnsoldProductsQueryResult := getNotSelledProductQueryMongo(date_to_analize_UTC, next_date_to_analize_UTC, invoices_collection)
		if errGettingUnsoldProductsQueryResult != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": errGettingUnsoldProductsQueryResult, "concluded": false, "message": "There was an error getting the less selling product from Mongo"})
		}
		if len(unsoldProductsQueryResult) != 0 {
			for _, iterProduct := range unsoldProductsQueryResult[0]["not_selled_products"].(primitive.A) {
				var product models.Product
				bsonBytes, err := bson.Marshal(iterProduct)
				if err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error decoding the unsold products"})
				}
				err = bson.Unmarshal(bsonBytes, &product)
				if err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error decoding the unsold products"})
				}
				unsoldProducts[i] = append(unsoldProducts[i], product)
			}
		}
		less_selling_product, err_getting_less_selling_pruduct := getLessSellingProductQueryMongo(date_to_analize_UTC, next_date_to_analize_UTC, invoices_collection)
		if err_getting_less_selling_pruduct != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_getting_less_selling_pruduct, "concluded": false, "message": "There was an error getting the less selling product from Mongo"})
		}
		var lenProducts = len(less_selling_product)
		if lenProducts == 0 {
			date_to_analize_UTC = next_date_to_analize_UTC
			continue
		}

		for j := 0; j < lenProducts; j++ {
			var product_id int = int(less_selling_product[j]["_id"].(int32))
			var product_quantity int = int(less_selling_product[j]["cantidad"].(int32))
			products, err := GetProductByIdHelper(product_id, db)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error getting the product from database"})
			}
			bar_items[j][i].Value = product_quantity
			bar_items[j][i].Name = products[0].Name + "- Cantidad vendida"
		}

		date_to_analize_UTC = next_date_to_analize_UTC
	}

	chartHTML, err := GenerateBarChart(bar_items, c, "Productos menos vendidos cada dia", "#%d Menos vendido ")
	if err != nil {
		return err
	}
	// Retorna el contenido del archivo HTML en el cuerpo de la respuesta
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"concluded": true, "message": "The report was generated successfully", "unsold_products": unsoldProducts, "chart": string(chartHTML)})

}
