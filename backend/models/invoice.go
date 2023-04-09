package models

import "time"

type product struct {
	ID       int `json:"id" bson:"id"`
	Cantidad int `json:"cantidad" bson:"cantidad"`
}

type Invoice struct {
	SubTotal  int       `json:"subtotal"`
	Total     int       `json:"total"`
	Products  []product `json:"products"`
	Timestamp time.Time `bson:"timestamp"`
}
