package controllers

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/gomail.v2"
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

func SendEmail(recipient string, bodyStr string, subject string) error {

	transporter := gomail.NewMessage()
	transporter.SetHeader("From", os.Getenv("GMAIL_USER"))
	transporter.SetHeader("To", recipient)
	transporter.SetHeader("Subject", subject)
	transporter.SetBody("text/html", bodyStr)

	//Establece la configuracion del servidor SMTP
	SMTP_info := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("GMAIL_USER"), os.Getenv("GMAIL_PASSWORD"))

	// Envia el correo electrónico
	if err_sending_email := SMTP_info.DialAndSend(transporter); err_sending_email != nil {
		return err_sending_email
	}

	return nil

}

func SendInvoice(c *fiber.Ctx) error {

	var bodyRequestData = struct {
		UserEmail string           `json:"user_email"`
		UserName  string           `json:"user_name"`
		SubTotal  int              `json:"subtotal"`
		Total     int              `json:"total"`
		Products  []models.Product `json:"products"`
	}{}

	if err_bodyParser := c.BodyParser(&bodyRequestData); err_bodyParser != nil {
		return err_bodyParser
	}
	// Define la cadena de HTML usando los datos anteriores
	htmlNameUser := fmt.Sprintf("<div><b> Cliente : %s </b>", bodyRequestData.UserName)
	htmlProducts := "<table><tr style='text-align: left'><th style='text-align: left'>Product</th><th style='text-align: left'>Price</th><th style='text-align: left'>Quantity</th></tr>"
	for _, product := range bodyRequestData.Products {
		htmlProducts += fmt.Sprintf("<tr><td>%s</td><td>%.2f</td><td>%d</td></tr>", product.Name, product.Price, product.Cantidad)
	}
	htmlProducts += "</table>"
	htmlPriceTotal := fmt.Sprintf("<p><b>Sub-total</b> : %d </p><p><b>Total</b> : %d </p></div>", bodyRequestData.SubTotal, bodyRequestData.Total)
	htmlString := htmlNameUser + htmlProducts + htmlPriceTotal

	if err := SendEmail(bodyRequestData.UserEmail, htmlString, "Factura de compra"); err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"message": "Email was send successfully"})

}

func SendInventoryAlertToAdministrator(c *fiber.Ctx, product models.Product, quantity int) error {

	if quantity < 5 {
		subject := "Alerta de inventario"
		bodyStr := fmt.Sprintf("<div><p>Recuerda agregar nuevo stock en tu tienda.</p><b> Producto : %s </b><p> Id : %d </p><p> Cantidad disponible : %d </p></div>", product.Name, product.ID, quantity)
		if err := SendEmail(os.Getenv("STOCK_ADMIN"), bodyStr, subject); err != nil {
			return err
		}
	}
	return nil

}

func SaveInvoice(c *fiber.Ctx, db *mongo.Database) error {

	//Se extrae el body request con el modelo de factura
	var bodyRequestData models.Invoice
	if err_bodyParser := c.BodyParser(&bodyRequestData); err_bodyParser != nil {
		return err_bodyParser
	}
	// se guarda el tiempo en el que se hace el guardado de la factura como tal
	loc, err_loading_time_location := time.LoadLocation("America/Bogota")
	if err_loading_time_location != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_loading_time_location.Error(), "concluded": false})
	}
	bodyRequestData.Timestamp = time.Now().In(loc)

	//obtenemos la coleccion de MongoDB
	colection := db.Collection("invoices")
	// Inserta el documento en la colección
	_, err_inserting_document := colection.InsertOne(context.Background(), bodyRequestData)
	if err_inserting_document != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err_inserting_document.Error(), "concluded": false})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Invoice was save succesfully", "concluded": true})
}
