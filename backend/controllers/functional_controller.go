package controllers

import (
	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func AddTaxes(c *fiber.Ctx) error {

	order := struct {
		SubTotal int `json:"subTotal"`
	}{}

	if err := c.BodyParser(&order); err != nil {
		return err
	}

	var subTotal float64 = float64(order.SubTotal)
	total := subTotal * 1.19

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"total": total})
}

func ConfirmPurchase(c *fiber.Ctx, db *mongo.Database) error {
	var bodyRequestData = struct {
		Username   string           `json:"username"`
		TotalPrice int              `json:"totalPrice"`
		Products   []models.Product `json:"products"`
	}{}

	if err_bodyParser := c.BodyParser(&bodyRequestData); err_bodyParser != nil {
		return err_bodyParser
	}

	error_reduce_balance := ReduceAccountBalance(c, db, bodyRequestData.TotalPrice, bodyRequestData.Username)
	if error_reduce_balance != nil { // Se verifica que se haga el proceso sin errores
		return error_reduce_balance
	}

	for _, product := range bodyRequestData.Products {
		error_reduce_stock := ReduceQuantityStockById(c, db, product.ID, product.Cantidad)
		if error_reduce_stock != nil { // Se verifica que se haga el proceso sin errores
			return error_reduce_balance
		}
	}

	return c.Status(200).JSON(fiber.Map{"result": "correct"})

}
