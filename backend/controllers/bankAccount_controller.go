package controllers

import (
	"context"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
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
