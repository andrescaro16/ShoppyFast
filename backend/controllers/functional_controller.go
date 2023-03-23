package controllers

import "github.com/gofiber/fiber/v2"

func AddTaxes(c *fiber.Ctx) error {

	order := struct {
		SubTotal int `json:"subTotal"`
	}{}

	if err := c.BodyParser(&order); err != nil {
		return err
	}

	var subTotal float64 = float64(order.SubTotal)

	total := subTotal * 0.19

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"total": total})
}
