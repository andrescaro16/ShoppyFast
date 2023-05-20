package models

type Coupon struct {
	Coupon_code string `json:"coupon_code" bson:"coupon_code" validate:"required,unique"`
	Discount    int    `json:"discount" bson:"discount,omitempty" validate:"required"`
}
