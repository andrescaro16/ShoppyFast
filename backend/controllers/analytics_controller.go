package controllers

import (
	"context"
	"io/ioutil"
	"os"
	"time"

	"github.com/go-echarts/go-echarts/v2/charts"
	"github.com/go-echarts/go-echarts/v2/opts"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func getBestSellingProductQueryMongo(date_to_analize_UTC time.Time, next_date_to_analize_UTC time.Time, invoices_collection *mongo.Collection) ([]bson.M, error) {
	// Definir el pipeline de agregación
	pipeline := mongo.Pipeline{
		bson.D{{"$match", bson.D{{"timestamp", bson.D{{"$gte", date_to_analize_UTC}, {"$lt", next_date_to_analize_UTC}}}}}},
		bson.D{{"$unwind", "$products"}},
		bson.D{{"$group", bson.D{{"_id", "$products.id"}, {"cantidad", bson.D{{"$sum", "$products.cantidad"}}}}}},
		bson.D{{"$sort", bson.D{{"cantidad", -1}}}},
		bson.D{{"$limit", 3}},
	}
	// Ejecutar la consulta
	var queryResults []bson.M
	cursor, err := invoices_collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return queryResults, err
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		var queryResult bson.M
		if err = cursor.Decode(&queryResult); err != nil {
			return queryResults, err
		}
		queryResults = append(queryResults, queryResult)
	}

	if err = cursor.Err(); err != nil {
		return queryResults, err
	}

	return queryResults, nil
}

func GetBestSellingProductChart(c *fiber.Ctx, db *mongo.Database) error {

	//Obtengo la fecha de la semana que se quiere analizar
	var bodyRequestData = struct {
		Date_to_analize string `json:"date_to_analize"`
	}{}
	if err_bodyParser := c.BodyParser(&bodyRequestData); err_bodyParser != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_bodyParser, "concluded": false, "message": "There was an error getting the body reques"})
	}
	date_to_analize, err_parsing_date_to_analize := time.Parse(time.RFC3339, bodyRequestData.Date_to_analize)
	if err_parsing_date_to_analize != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_parsing_date_to_analize, "concluded": false, "message": "There was an error parsing the date"})
	}
	date_to_analize_UTC := date_to_analize.UTC()

	// Calcula la cantidad de días necesarios para llegar al lunes
	days_until_monday := int(time.Monday - date_to_analize_UTC.Weekday())
	// calcula la fecha del lunes
	date_to_analize_UTC = date_to_analize_UTC.AddDate(0, 0, days_until_monday)
	// ajusta la hora a las 00:00:00
	date_to_analize_UTC = date_to_analize_UTC.Truncate(24 * time.Hour)

	// Obtener una referencia a la colección de productos
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
	chart_bar := charts.NewBar()
	chart_bar.SetGlobalOptions(
		charts.WithTitleOpts(opts.Title{Title: "Productos mas vendidos cada dia", Subtitle: "Pasa el mouse encima de cada vela para obtener mas informacion"}),
		charts.WithTooltipOpts(opts.Tooltip{Show: true}),
		charts.WithLegendOpts(opts.Legend{Show: true, Right: "80px"}),
	)
	chart_bar.SetXAxis([]string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}).
		AddSeries("#1 Mas vendido ", bar_items[0][:]).
		AddSeries("#2 Mas vendido ", bar_items[1][:]).
		AddSeries("#3 Mas vendido", bar_items[2][:])

	f, _ := os.Create("bar.html")
	chart_bar.Render(f)

	// Lee el archivo HTML generado
	chartHTML, err := ioutil.ReadFile("bar.html")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error reading the html file"})
	}
	err = os.Remove("bar.html")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err, "concluded": false, "message": "There was an error removing the html file"})
	}
	// Retorna el contenido del archivo HTML en el cuerpo de la respuesta
	return c.Status(fiber.StatusOK).Send(chartHTML)

}
