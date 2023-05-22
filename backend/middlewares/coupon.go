package middlewares

import (
	"context"
	"errors"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func VerifyCoupon(db *mongo.Database) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {

		//Obtener una referencia a la colección de cupones
		collection := db.Collection("coupons")

		var coupon models.Coupon

		if err := c.BodyParser(&coupon); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err, "concluded": false})
		}

		//Buscar cupon por codigo
		var filter primitive.M = bson.M{"coupon_code": coupon.Coupon_code}
		var result *mongo.SingleResult = collection.FindOne(context.Background(), filter)
		if result.Err() != nil {

			if errors.Is(result.Err(), mongo.ErrNoDocuments) {
				// Si el cupon no fue encontrado
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": result.Err(), "concluded": false, "message": "Coupon not found"})
			} else {
				return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": result.Err(), "concluded": false})
			}
		}
		//Agregamos el campo del descuento del cupon al contexto
		if err := result.Decode(&coupon); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": result.Err(), "concluded": false})
		}
		c.Locals("discount", coupon.Discount)

		return c.Next()
	}
}
