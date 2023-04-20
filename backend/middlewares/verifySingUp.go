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

type adminAccount struct {
	Username               string `json:"username" bson:"username"`
	Email                  string `json:"email" bson:"email"`
	Password               string `json:"password" bson:"password"`
	PasswordAuthentication string `json:"passwordAuthentication" bson:"passwordAuthentication"`
}

func CheckDuplicateEmail(db *mongo.Database) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// Obtener una referencia a la colección de admin
		var collection *mongo.Collection = db.Collection("admins")

		var adminAccountInfo adminAccount

		if err := c.BodyParser(&adminAccountInfo); err != nil {
			return err
		}

		var email string = adminAccountInfo.Email

		if email == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "email is not provided"})
		}
		// Buscar cuenta por username
		var filter primitive.M = bson.M{"email": email}
		var result *mongo.SingleResult = collection.FindOne(context.Background(), filter)
		if errors.Is(result.Err(), mongo.ErrNoDocuments) {
			// Si el email no fue encontrado, seguir con la peticion
			return c.Next()
		}

		if result.Err() != nil {
			return result.Err()
		} else {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "The email already exist. Try another one"})
		}
	}
}

func IsAuthorizedToCreateAdmin(c *fiber.Ctx) error {

	// Obtener la contraña de verificacion para poder procesar la solicitud
	var adminAccountInfo adminAccount

	if err := c.BodyParser(&adminAccountInfo); err != nil {
		return err
	}

	var passwordAuthentication string = adminAccountInfo.PasswordAuthentication

	if passwordAuthentication == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "passwordAuthentication is not provided"})
	}

	if passwordAuthentication != os.Getenv("SECRET") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "You are not authorized to create an admin account"})
	}

	return c.Next()
}
