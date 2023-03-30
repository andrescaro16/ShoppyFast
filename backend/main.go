package main

// El main contendra el resto de paquetes

import (
	"context"
	"fmt"
	"log"
	"os"
	"reflect"

	"github.com/andrescaro16/ShoppyFast/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	//Creo la aplicacion
	app := fiber.New()

	// Intento cargar las vareiables de entorno dell archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	client := NewMongoClient(MONGODB_URI)
	db := client.Database("test")
	fmt.Println(reflect.TypeOf(db))
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//CORS
	app.Use(cors.New())

	api := app.Group("/api")

	//defino los siguientes endoPoints
	products := api.Group("/products")
	routes.LoadProductsRoutes(products, db)

	bankAccounts := api.Group("/bankAccounts")
	routes.LoadBankAccountRoutes(bankAccounts, db)

	functionalities := api.Group("/f")
	routes.LoadFunctionalities(functionalities, db)

	log.Println("Server on port 3001")
	app.Listen(":" + port)
	log.Println("Server on port 3001")

}
