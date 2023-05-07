package controllers

import (
	"context"
	"errors"
	"strconv"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetProductByIdHelper(id int, db *mongo.Database) ([]models.Product, error) {
	// Obtener una referencia a la colección de productos
	collection := db.Collection("products")

	// Buscar el producto por su ID
	filter := bson.M{"id": id}
	result := collection.FindOne(context.Background(), filter)

	// Verificar si se encontró el producto
	if result.Err() != nil {
		if errors.Is(result.Err(), mongo.ErrNoDocuments) {
			// Si el producto no fue encontrado, retornar un error 404
			return nil, result.Err()
		}
		// Si hubo algún otro error, retornarlo
		return nil, result.Err()
	}

	// Decodificar el resultado en un Product
	var product models.Product
	var products []models.Product
	err := result.Decode(&product)
	if err != nil {
		return nil, err
	}

	products = append(products, product)
	return products, nil
}

func GetProductById(c *fiber.Ctx, db *mongo.Database) error {
	// Obtener el ID del producto desde los parámetros de la solicitud
	id, err := strconv.Atoi(c.Params("productId"))
	if err != nil {
		return err
	}

	products, err := GetProductByIdHelper(id, db)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": err, "message": "Product not found"})
	}
	// Retornar el Product como respuesta
	return c.JSON(products)
}

func UpdateProductByIdHelper(c *fiber.Ctx, db *mongo.Database, filter primitive.M, update primitive.M) error {
	// Obtener una referencia a la colección de productos
	collection := db.Collection("products")

	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error(), "concluded": false})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Product updated complete", "concluded": true})
}

func ReduceQuantityStockById(c *fiber.Ctx, db *mongo.Database, id int, quantity int) error {
	// Obtener una referencia a la colección de productos
	collection := db.Collection("products")
	// Buscar el producto por su ID
	filter := bson.M{"id": id}
	result_find_product := collection.FindOne(context.Background(), filter)
	// Verificar si se encontró el producto
	if result_find_product.Err() != nil {
		if errors.Is(result_find_product.Err(), mongo.ErrNoDocuments) {
			// Si el producto no fue encontrado, retornar un error 404
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Product not found", "concluded": false})
		}
		// Si hubo algún otro error, retornarlo
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"Error": result_find_product.Err(), "concluded": false})
	}

	// Decodificar el resultado en un Product
	var product models.Product

	if err_bodyParser := result_find_product.Decode(&product); err_bodyParser != nil {
		return c.JSON(fiber.Map{"Error": err_bodyParser, "concluded": false})
	}

	newProductQuantity := product.Cantidad - quantity
	update := bson.M{"$set": bson.M{"cantidad": newProductQuantity}}
	err_updating_product := UpdateProductByIdHelper(c, db, filter, update)
	if err_updating_product != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_updating_product, "concluded": false})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Product reduced stock complete", "concluded": true})

}

func UpdateProductById(c *fiber.Ctx, db *mongo.Database) error {
	//Obterner el ID del producto desde los parámetros de la solicitud
	id, err := strconv.Atoi(c.Params("productId"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error(), "concluded": false})
	}

	//Busca el producto por su ID
	filter := bson.M{"id": id}

	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error(), "concluded": false})
	}

	update := bson.M{"$set": product}

	return UpdateProductByIdHelper(c, db, filter, update)

}

func AddNewProduct(c *fiber.Ctx, db *mongo.Database) error {
	// Obtener una referencia a la colección de productos
	collection := db.Collection("products")

	// Decodificar el body de la solicitud en un Product
	var product models.Product
	if err := c.BodyParser(&product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error(), "concluded": false})
	}

	// Insertar el producto en la base de datos
	result, err := collection.InsertOne(context.Background(), product)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error(), "concluded": false})
	}

	// Retornar el ID del producto recién insertado
	return c.Status(201).JSON(fiber.Map{"message": "Product created successfully", "concluded": true, "productId": result.InsertedID})
}

func GetProductAll(c *fiber.Ctx, db *mongo.Database) error {
	// Obtener todos los productos de la base de datos
	collection := db.Collection("products")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error finding products",
		})
	}
	defer cursor.Close(context.Background())

	// Crear un slice de Product para almacenar los resultados
	var products []models.Product

	// Iterar sobre el cursor y agregar cada producto al slice
	for cursor.Next(context.Background()) {
		var product models.Product
		err := cursor.Decode(&product)
		if err != nil {
			return err
		}
		products = append(products, product)
	}

	// Verificar si hubo algún error al iterar el cursor
	if err := cursor.Err(); err != nil {
		return err
	}

	// Retornar el slice de Product como respuesta
	return c.JSON(products)
}
