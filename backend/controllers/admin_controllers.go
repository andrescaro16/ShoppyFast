package controllers

import (
	"context"
	"errors"
	"os"
	"time"

	"github.com/andrescaro16/ShoppyFast/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func jwtSignIn(admin_id primitive.ObjectID) (string, error) {
	// Definir payload
	claims := jwt.MapClaims{
		"id":  admin_id,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
	}
	// Crear el token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Firmar el token con una clave secreta
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func CreateAdminAccount(c *fiber.Ctx, db *mongo.Database) error {

	var adminAccountInfo models.AdminAccount

	if err := c.BodyParser(&adminAccountInfo); err != nil {
		return err
	}
	if err := adminAccountInfo.EncryptPassword(); err != nil {
		return err
	}
	// Obtener una referencia a la colección de admins
	var collection *mongo.Collection = db.Collection("admins")

	// insert the document into the collection
	insertResult, err := collection.InsertOne(context.Background(), adminAccountInfo)
	if err != nil {
		return err
	}

	// get the _id of the inserted document
	insertedID := insertResult.InsertedID.(primitive.ObjectID)

	// create the token
	token, err := jwtSignIn(insertedID)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "Admin account created", "concluded": true, "token": token})
}

func AdminAccountSignIn(c *fiber.Ctx, db *mongo.Database) error {

	var adminAccountInfoRequest models.AdminAccount

	if err := c.BodyParser(&adminAccountInfoRequest); err != nil {
		return err
	}

	// Obtener una referencia a la colección de admins
	var collection *mongo.Collection = db.Collection("admins")

	// Buscar la cuenta admin por su email
	filter := bson.M{"email": adminAccountInfoRequest.Email}
	result_find_account := collection.FindOne(context.Background(), filter)

	// Verificar si se encontró el admin
	if result_find_account.Err() != nil {
		if errors.Is(result_find_account.Err(), mongo.ErrNoDocuments) {
			// Si el admin no fue encontrado, retornar un error 404
			return c.Status(404).JSON(fiber.Map{"message": "Admin not found", "concluded": false})
		}
		// Si hubo algún otro error, retornarlo
		return c.JSON(fiber.Map{"Error": result_find_account.Err(), "concluded": false})
	}

	var adminAccountDataResult = struct {
		ID       primitive.ObjectID `json:"_id" bson:"_id"`
		Username string             `json:"username" bson:"username"`
		Email    string             `json:"email" bson:"email"`
		Password string             `json:"password" bson:"password"`
	}{}

	if err := result_find_account.Decode(&adminAccountDataResult); err != nil {
		return c.JSON(fiber.Map{"Error": err, "concluded": false})
	}
	var matchPassword bool = adminAccountInfoRequest.ComparePassword(adminAccountDataResult.Password)
	if !matchPassword {
		return c.Status(401).JSON(fiber.Map{"message": "Password incorrect", "concluded": false})
	}

	// create the token
	token, err := jwtSignIn(adminAccountDataResult.ID)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"message": "Admin account found", "concluded": true, "token": token})

}
