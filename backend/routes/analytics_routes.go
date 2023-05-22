package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/andrescaro16/ShoppyFast/backend/middlewares"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadAnalyticsRoutes(app fiber.Router, db *mongo.Database) {
	app.Post("/getBestSellingProducts", middlewares.VerifyToken(db), func(c *fiber.Ctx) error {
		return controllers.GetBestSellingProductChart(c, db)
	})

	app.Post("/getLessSellingProducts", middlewares.VerifyToken(db), func(c *fiber.Ctx) error {
		return controllers.GetLessSalingProductReport(c, db)
	})
}
