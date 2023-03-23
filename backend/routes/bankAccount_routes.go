package routes

import (
	"github.com/andrescaro16/ShoppyFast/backend/controllers"
	"github.com/andrescaro16/ShoppyFast/backend/middlewares"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoadBankAccountRoutes(app fiber.Router, db *mongo.Database) {

	app.Post("/createBankAccount", middlewares.CheckDuplicateUsername(db), middlewares.IsAuthorizedToCreateBankAccount, func(c *fiber.Ctx) error {
		return controllers.CreateBankAccount(c, db)
	})

	// app.Post("/createBankAccount", func(c *fiber.Ctx) error {
	// 	return controllers.CreateBankAccount(c, db)
	// })
}
