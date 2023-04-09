package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadFunctionalities(app fiber.Router, db *mongo.Database) {

	app.Post("/calculateTax", func(c *fiber.Ctx) error {
		return controllers.AddTaxes(c)
	})

	app.Post("/confirmPurchase", func(c *fiber.Ctx) error {
		return controllers.ConfirmPurchase(c, db)
	})

	app.Post("/sendInvoice", func(c *fiber.Ctx) error {
		return controllers.SendInvoice(c)
	})

	app.Post("/saveInvoice", func(c *fiber.Ctx) error {
		return controllers.SaveInvoice(c, db)
	})

}
