package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadProductsRoutes(app fiber.Router, db *mongo.Database) {
	//Defino las rutas de los productos con sus controladores
	app.Get("/:productId", func(c *fiber.Ctx) error {
		return controllers.GetProductById(c, db)
	})

	app.Get("/", func(c *fiber.Ctx) error {
		return controllers.GetProductAll(c, db)
	})

}
