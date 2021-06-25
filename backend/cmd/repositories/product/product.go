package product

import (
	"backend/cmd/config"
	ProductModel "backend/cmd/models/product"
	"backend/internal/database"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

const collection = "products"

func All() []ProductModel.Product {
	var client, _ = database.Client()
	var cursor, _ = client.Database("pointofsale").Collection(collection).Find(context.Background(), bson.D{{}})

	var products = make([]ProductModel.Product, 0)

	_ = cursor.All(context.Background(), &products)

	for i := 0; i < len(products); i++ {
		products[i].Image = config.ProductsImageUrl + products[i].Image
	}

	return products
}

func Update(id string, p ProductModel.Product) (interface{}, int, error) {
	var client, _ = database.Client()
	var objectId, _ = primitive.ObjectIDFromHex(id)

	var _, err = client.Database("pointofsale").Collection(collection).UpdateOne(context.Background(), bson.M {
		"_id": bson.M {
			"$eq": objectId,
		},
	}, bson.M{
		"$set": bson.D{
			{Key: "name", Value: p.Name},
			{Key: "stock", Value: p.Stock},
			{Key: "minimum_stock", Value: p.MinimumStock},
			{Key: "selling_price", Value: p.SellingPrice},
			{Key: "purchase_price", Value: p.PurchasePrice},
			{Key: "barcode", Value: p.Barcode},
			{Key: "sku", Value: p.SKU},
			{Key: "category", Value: p.Category},
			{Key: "outlet", Value: p.Outlet},
		},
	})

	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	return p, http.StatusNoContent, nil
}

func UpdateImage(id string, p ProductModel.Product) (interface{}, int, error) {
	var client, _ = database.Client()
	var objectId, _ = primitive.ObjectIDFromHex(id)

	var _, err = client.Database("pointofsale").Collection(collection).UpdateOne(context.Background(), bson.M {
		"_id": bson.M {
			"$eq": objectId,
		},
	}, bson.M{
		"$set": bson.D{
			{Key: "image", Value: p.ImageUploader.FullName},
		},
	})

	if err != nil {
		return nil, http.StatusInternalServerError, err
	}

	return p, http.StatusNoContent, nil
}

func InsertOne(p ProductModel.Product) (*mongo.InsertOneResult, error)  {
	var client, _ = database.Client()
	p.Id = primitive.NewObjectID()

	var result, err = client.Database("pointofsale").Collection(collection).InsertOne(context.Background(), bson.D{
		{Key: "_id", Value: p.Id},
		{Key: "name", Value: p.Name},
		{Key: "stock", Value: p.Stock},
		{Key: "minimum_stock", Value: p.MinimumStock},
		{Key: "selling_price", Value: p.SellingPrice},
		{Key: "purchase_price", Value: p.PurchasePrice},
		{Key: "barcode", Value: p.Barcode},
		{Key: "sku", Value: p.SKU},
		{Key: "category", Value: p.Category},
		{Key: "outlet", Value: p.Outlet},
		{Key: "image", Value: p.ImageUploader.FullName},
	})

	if err != nil {
		return nil, err
	}

	return result, nil
}

func Delete(id string) (string, int) {
	var client, _ = database.Client()

	var objectId, _ = primitive.ObjectIDFromHex(id)
	var _, err = client.Database("pointofsale").Collection(collection).DeleteOne(context.Background(), bson.M{
		"_id": objectId,
	})

	if err != nil {
		return err.Error(), http.StatusInternalServerError
	}

	return "Data deleted successfully", http.StatusNoContent
}

func Retrieve(id string) interface{} {
	var client, _ = database.Client()
	var product ProductModel.Product

	var objectId, _ = primitive.ObjectIDFromHex(id)
	var err = client.Database("pointofsale").Collection(collection).FindOne(context.Background(), bson.M{
		"_id": objectId,
	}).Decode(&product)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
	}

	return product
}
