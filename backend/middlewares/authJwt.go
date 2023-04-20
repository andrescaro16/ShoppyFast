package middlewares

import (
	"context"
	"os"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Claims struct {
	ID primitive.ObjectID `json:"id"`
	jwt.RegisteredClaims
}

func VerifyToken(db *mongo.Database) fiber.Handler {

	return func(c *fiber.Ctx) error {
		tokenString := c.Get("x-access-token")
		if tokenString == "" {
			return c.Status(403).JSON(fiber.Map{"message": "No token provided"})
		}

		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("SECRET")), nil
		})

		if err != nil {
			return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
		}

		claims, ok := token.Claims.(*Claims)
		if !(ok && token.Valid) {
			return c.Status(401).JSON(fiber.Map{"message": "Unauthorized"})
		}

		adminCollection := db.Collection("admins")
		var admin models.AdminAccount
		err = adminCollection.FindOne(context.Background(), bson.M{"_id": claims.ID}).Decode(&admin)

		if err != nil {
			return c.Status(404).JSON(fiber.Map{"message": "No user found"})
		}

		return c.Next()
	}

}
