package models

type BankAccount struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
	Balance  int    `json:"balance" bson:"balance"`
}
