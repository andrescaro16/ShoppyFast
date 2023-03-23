package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func LoadFunctionalities(app fiber.Router) {

	app.Get("/calculateTax", func(c *fiber.Ctx) error {
		return controllers.AddTaxes(c)
	})

}
