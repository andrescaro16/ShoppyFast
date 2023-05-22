package controllers

import (
	"fmt"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateCoupon(c *fiber.Ctx, db *mongo.Database) error {
	// / Obtener una referencia a la colección de cupones
	collection := db.Collection("coupons")

	// Obtener el cupon desde el body de la solicitud
	var coupon models.Coupon
	if err := c.BodyParser(&coupon); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err, "concluded": false})
	}

	fmt.Println(coupon)
	// Insertar el cupon en la base de datos
	_, err := collection.InsertOne(c.Context(), coupon)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err, "concluded": false})
	}

	return c.Status(201).JSON(fiber.Map{"concluded": true, "message": "Coupon created successfully"})

}

func ApplyDiscount(c *fiber.Ctx, db *mongo.Database) error {

	var bodyRequestData = struct {
		Coupon_code string `json:"coupon_code"`
		TotalPrice  int    `json:"total_price"`
	}{}

	if err := c.BodyParser(&bodyRequestData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err, "concluded": false})
	}

	if bodyRequestData.TotalPrice <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"concluded": false, "message": "Total price must be greater than 0"})
	}

	var discount int = c.Locals("discount").(int)

	var applied_discount int = (bodyRequestData.TotalPrice * discount) / 100
	var new_total_price int = bodyRequestData.TotalPrice - applied_discount

	return c.Status(200).JSON(fiber.Map{"concluded": true, "message": "Discount applied successfully", "discount": applied_discount, "new_total_price": new_total_price})
}
