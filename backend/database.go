package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewMongoClient(MONGODB_URI string) *mongo.Client {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(MONGODB_URI))

	if err != nil {
		panic(err)
	}else{
		fmt.Println("Database is connected")
	}

	return client
}
