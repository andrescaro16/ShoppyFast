package controllers

import (
	"context"
	"errors"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateBankAccount(c *fiber.Ctx, db *mongo.Database) error {

	// Obtener los datos necesarios del body del request
	var bankAccount models.BankAccount

	if err := c.BodyParser(&bankAccount); err != nil {
		return err
	}

	// Obtener una referencia a la colección de bankAccounts
	var collection *mongo.Collection = db.Collection("bankAccounts")

	//insertar la cuneta en la coleccin
	if _, err := collection.InsertOne(context.Background(), bankAccount); err != nil {
		return err
	}

	return c.Status(fiber.StatusAccepted).JSON(bankAccount)

}

func BankAccountSignIn(c *fiber.Ctx, db *mongo.Database) error {
	// Obtener los datos necesario del body request
	var bodyRequestData = struct {
		Username   string `json:"username"`
		Password   string `json:"password"`
		TotalPrice int    `json:"totalPrice"`
	}{}

	if err := c.BodyParser(&bodyRequestData); err != nil {

		return c.JSON(fiber.Map{"Error": err, "validation": false})
	}

	// Obtener una referencia a la coleccion de bankAccounts
	var collection *mongo.Collection = db.Collection("bankAccounts")

	// Buscar el producto por su ID
	filter := bson.M{"username": bodyRequestData.Username}
	result := collection.FindOne(context.Background(), filter)

	// Verificar si se encontró el producto
	if result.Err() != nil {
		if errors.Is(result.Err(), mongo.ErrNoDocuments) {
			// Si el usuario no fue encontrado, retornar un error 404
			return c.Status(200).JSON(fiber.Map{"message": "User not found", "validation": false})
		}
		// Si hubo algún otro error, retornarlo

		return c.JSON(fiber.Map{"Error": result.Err(), "validation": false})
	}

	var bankAccountDataResult models.BankAccount
	err := result.Decode(&bankAccountDataResult)
	if err != nil {
		return c.JSON(fiber.Map{"Error": err, "validation": false})
	}

	if bodyRequestData.Password != bankAccountDataResult.Password {
		return c.Status(200).JSON(fiber.Map{"message": "Incorrect Password", "validation": false})
	}

	if bankAccountDataResult.Balance < bodyRequestData.TotalPrice {
		return c.Status(200).JSON(fiber.Map{
			"message":       "You don't have the enought money to pay",
			"validation":    true,
			"validPurchase": false,
			"balance":       bankAccountDataResult.Balance,
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":       "Correct",
		"validation":    true,
		"validPurchase": true,
		"balance":       bankAccountDataResult.Balance,
	})

}
