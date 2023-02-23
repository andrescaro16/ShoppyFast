package controllers

import (
	"context"
	"errors"
	"strconv"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetProductById(c *fiber.Ctx, db *mongo.Database) error {
	// Obtener una referencia a la colección de productos
	collection := db.Collection("products")

	// Obtener el ID del producto desde los parámetros de la solicitud
	id, err := strconv.Atoi(c.Params("productId"))
	if err != nil {
		return err
	}

	// Buscar el producto por su ID
	filter := bson.M{"id": id}
	result := collection.FindOne(context.Background(), filter)

	// Verificar si se encontró el producto
	if result.Err() != nil {
		if errors.Is(result.Err(), mongo.ErrNoDocuments) {
			// Si el producto no fue encontrado, retornar un error 404
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Product not found"})
		}
		// Si hubo algún otro error, retornarlo
		return result.Err()
	}

	// Decodificar el resultado en un Product
	var product models.Product
	var products []models.Product
	err = result.Decode(&product)
	if err != nil {
		return err
	}

	products = append(products, product)

	// Retornar el Product como respuesta
	return c.JSON(products)
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
