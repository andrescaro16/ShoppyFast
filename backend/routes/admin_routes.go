package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/andrescaro16/ShoppyFast/backend/middlewares"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadAdminRoutes(app fiber.Router, db *mongo.Database) {
	app.Post("/signup", middlewares.CheckDuplicateEmail(db), middlewares.IsAuthorizedToCreateAdmin, func(c *fiber.Ctx) error {
		return controllers.CreateAdminAccount(c, db)
	})

	app.Post("/signin", func(c *fiber.Ctx) error {
		return controllers.AdminAccountSignIn(c, db)
	})

}
