package middlewares

import (
	"context"
	"errors"
	"os"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type bankAccount struct {
	Username               string `json:"username,omitempty" bson:"username,omitempty"`
	Password               string `json:"password,omitempty" bson:"password,omitempty"`
	Balance                int    `json:"balance,omitempty" bson:"balance,omitempty"`
	PasswordAuthentication string `json:"passwordAuthentication,omitempty" bson:"passwordAuthentication,omitempty"`
}

func CheckDuplicateUsername(db *mongo.Database) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {

		// Obtener una referencia a la colección de bankAccounts
		var collection *mongo.Collection = db.Collection("bankAccounts")

		// Obtener el username de la cuenta a crear desde el body de la solicitud
		var bankAccountInfo bankAccount

		if err := c.BodyParser(&bankAccountInfo); err != nil {
			return err
		}

		var username string = bankAccountInfo.Username

		if username == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "username is not provided"})
		}

		// Buscar cuenta por username
		var filter primitive.M = bson.M{"username": username}
		var result *mongo.SingleResult = collection.FindOne(context.Background(), filter)
		if errors.Is(result.Err(), mongo.ErrNoDocuments) {
			// Si el usuario no fue encontrado, seguir con la peticion
			return c.Next()
		}

		if result.Err() != nil {
			return result.Err()
		} else {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "The username already exist. Try another one"})
		}
	}
}

func IsAuthorizedToCreateBankAccount(c *fiber.Ctx) error {

	// Obtener la contraña de verificacion para poder procesar la solicitud
	var bankAccountInfo bankAccount

	if err := c.BodyParser(&bankAccountInfo); err != nil {
		return err
	}
	var passwordAuthentication string = bankAccountInfo.PasswordAuthentication
	var realpasswordAuthentication string = os.Getenv("SECRET")

	if passwordAuthentication != realpasswordAuthentication {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "You can't create bank account"})
	}
	return c.Next()
}
