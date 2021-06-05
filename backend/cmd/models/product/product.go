package product

import (
	"backend/internal/file"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	Id				primitive.ObjectID 	`json:"id" bson:"_id"`
	Name 			string				`json:"name" bson:"name" validate:"required"`
	Stock 			uint64				`json:"stock" bson:"stock" validate:"required,gte=1,max=62000"`
	MinimumStock 	uint64				`json:"minimum_stock" bson:"minimum_stock" validate:"required,min=1,max=1000"`
	SellingPrice 	uint64				`json:"selling_price" bson:"selling_price" validate:"required,min=1"`
	PurchasePrice 	uint64				`json:"purchase_price" bson:"purchase_price" validate:"required,min=1"`
	Barcode 		string				`json:"barcode" bson:"barcode"`
	SKU 			string				`json:"sku" bson:"sku"`
	Category 		string 				`json:"category" bson:"category"`		// relational to "category" table
	Outlet 			string 				`json:"outlet" bson:"outlet"`			// relational to "outlet" table
	ImageUploader	file.Uploader		`json:"-"`
	Image			string				`json:"image" bson:"image"`
}