package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/andrescaro16/ShoppyFast/backend/middlewares"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadCouponRoutes(app fiber.Router, db *mongo.Database) {

	app.Post("/createCoupon", middlewares.VerifyToken(db), func(c *fiber.Ctx) error {
		return controllers.CreateCoupon(c, db)
	})

	app.Post("/applyDiscount", middlewares.VerifyCoupon(db), func(c *fiber.Ctx) error {
		return controllers.ApplyDiscount(c, db)
	})
}
