package models

type Product struct {
	ID          int     `json:"id,omitempty" bson:"id,omitempty"`
	Name        string  `json:"name,omitempty" bson:"name,omitempty"`
	Marca       string  `json:"marca,omitempty" bson:"marca,omitempty"`
	Description string  `json:"description,omitempty" bson:"description,omitempty"`
	Price       float64 `json:"price,omitempty" bson:"price,omitempty"`
	ImgURL      string  `json:"imgURL,omitempty" bson:"imgURL,omitempty"`
	Cantidad    int     `json:"cantidad,omitempty" bson:"cantidad,omitempty"`
}
