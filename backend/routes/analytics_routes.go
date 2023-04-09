package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadAnalyticsRoutes(app fiber.Router, db *mongo.Database) {
	app.Post("/getBestSellingProducts", func(c *fiber.Ctx) error {
		return controllers.GetBestSellingProductChart(c, db)
	})
}
