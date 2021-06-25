package product

import (
	"backend/internal/file"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	Id				primitive.ObjectID 	`json:"id" bson:"_id" name:"Id"`
	Name 			string				`json:"name" bson:"name" name:"Name" validate:"required"`
	Stock 			uint64				`json:"stock" bson:"stock" name:"Stock" validate:"required,gte=1,max=62000"`
	MinimumStock 	uint64				`json:"minimum_stock" bson:"minimum_stock" name:"Minimum stock" validate:"required,min=1,max=1000"`
	SellingPrice 	uint64				`json:"selling_price" bson:"selling_price" name:"Selling price" validate:"required,min=1"`
	PurchasePrice 	uint64				`json:"purchase_price" bson:"purchase_price" name:"Purchase price" validate:"required,min=1"`
	Barcode 		string				`json:"barcode" bson:"barcode" name:"Barcode"`
	SKU 			string				`json:"sku" bson:"sku" name:"Sku"`
	Category 		string 				`json:"category" bson:"category" name:"Category"`		// relational to "category" table
	Outlet 			string 				`json:"outlet" bson:"outlet" name:"Outlet"`				// relational to "outlet" table
	ImageUploader	file.Uploader		`json:"-"`
	Image			string				`json:"image" bson:"image" name:"Image"`
}
