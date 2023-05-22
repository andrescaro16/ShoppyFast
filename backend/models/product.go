package models

type Product struct {
	ID          int     `json:"id" bson:"id,omitempty" validate:"required,unique"`
	Name        string  `json:"name" bson:"name,omitempty"`
	Marca       string  `json:"marca" bson:"marca,omitempty"`
	Description string  `json:"description" bson:"description,omitempty"`
	Price       float64 `json:"price" bson:"price,omitempty"`
	Category    string  `json:"category" bson:"category,omitempty"`
	Deleted     bool    `json:"deleted" bson:"deleted,omitempty"`
	ImgURL      string  `json:"imgURL" bson:"imgURL,omitempty"`
	Cantidad    int     `json:"cantidad" bson:"cantidad,omitempty"`
}
