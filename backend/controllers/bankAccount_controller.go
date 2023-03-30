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

func ReduceAccountBalance(c *fiber.Ctx, db *mongo.Database, totalPrice int, username string) error {
	// Obtener una referencia a la coleccion de bankAccounts
	var collection *mongo.Collection = db.Collection("bankAccounts")

	// Buscar la cuenta de banco por su username
	filter := bson.M{"username": username}
	result_find_account := collection.FindOne(context.Background(), filter)

	// Verificar si se encontró el producto
	if result_find_account.Err() != nil {
		if errors.Is(result_find_account.Err(), mongo.ErrNoDocuments) {
			// Si el usuario no fue encontrado, retornar un error 404
			return c.Status(404).JSON(fiber.Map{"message": "User not found", "concluded": false})
		}
		// Si hubo algún otro error, retornarlo

		return c.JSON(fiber.Map{"Error": result_find_account.Err(), "concluded": false})
	}

	var bankAccountDataResult models.BankAccount
	err_decode := result_find_account.Decode(&bankAccountDataResult)
	if err_decode != nil {
		return c.JSON(fiber.Map{"Error": err_decode, "concluded": false})
	}

	var newBalance = bankAccountDataResult.Balance - totalPrice

	update := bson.M{"$set": bson.M{"balance": newBalance}}
	_, err_updating_account := collection.UpdateOne(context.Background(), filter, update)
	if err_updating_account != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_updating_account.Error(), "concluded": false})
	}
	return c.Status(200).JSON(fiber.Map{"message": "Balance updated successfully.", "concluded": true})
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

	// Buscar la cuenta de banco por su username
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
