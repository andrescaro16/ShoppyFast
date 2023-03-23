package models

type Product struct {
	ID          int     `json:"id" bson:"id"`
	Name        string  `json:"name" bson:"name"`
	Marca       string  `json:"marca" bson:"marca"`
	Description string  `json:"description" bson:"description"`
	Price       float64 `json:"price" bson:"price"`
	ImgURL      string  `json:"imgURL" bson:"imgURL"`
	Cantidad    int     `json:"cantidad" bson:"cantidad"`
}
