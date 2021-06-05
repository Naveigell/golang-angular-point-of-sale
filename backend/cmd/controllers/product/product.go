package product

import (
	Helpers "backend/cmd/helpers"
	ProductModel "backend/cmd/models/product"
	Product "backend/cmd/services/product"
	FileHandler "backend/internal/file"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

var product = new(Product.ProductService)

func GetAll(context *gin.Context) {
	var response, status = product.All()

	context.JSON(status, gin.H{
		"data": response,
		"status": status,
	})
}

func Retrieve(context *gin.Context) {
	var data, status = product.Retrieve(context.Param("id"))

	context.JSON(status, gin.H{
		"data": data,
		"status": status,
	})
}

func UpdateImage(context *gin.Context) {
	var p ProductModel.Product

	file, handler, _ := context.Request.FormFile("image")

	p.ImageUploader = FileHandler.Uploader {
		File: file,
		Handler: handler,
	}

	var message, validation, status, err = product.UpdateImage(context.Param("id"), p)
	if err != nil {
		fmt.Println(err)
	}

	if err != nil {
		context.JSON(status, gin.H{
			"message": message,
			"status": status,
			"error": validation,
			"success": false,
		})
	} else {
		context.JSON(status, gin.H{
			"data": message,
			"status": status,
			"success": true,
		})
	}
}

func Update(context *gin.Context) {
	var p ProductModel.Product
	_ = json.NewDecoder(context.Request.Body).Decode(&p)

	var message, validation, status, err = product.Update(context.Param("id"), p)
	if err != nil {
		fmt.Println(err)
	}

	if status == http.StatusUnprocessableEntity {
		context.JSON(status, gin.H{
			"message": message,
			"status": status,
			"error": validation,
			"success": false,
		})
	} else {
		context.JSON(status, gin.H{
			"data": message,
			"status": status,
			"success": true,
		})
	}
}

func Delete(context *gin.Context) {
	var message, status = product.Delete(context.Param("id"))

	if status == http.StatusNoContent {
		context.JSON(status, gin.H{
			"message": message,
			"status": status,
			"success": true,
		})
	} else {
		context.JSON(status, gin.H{
			"message": message,
			"status": status,
			"success": false,
		})
	}
}

func Insert(context *gin.Context) {
	var p ProductModel.Product
	//_ = json.NewDecoder(context.Request.Body).Decode(&p)

	file, handler, _ := context.Request.FormFile("image")

	p.ImageUploader = FileHandler.Uploader {
		File: file,
		Handler: handler,
	}
	Helpers.FormData{
		Request: context.Request,
	}.Parse(&p, []string{"name", "stock", "minimum_stock", "purchase_price", "selling_price"})

	var message, validation, status, err = product.Insert(p)

	if err != nil {
		fmt.Println(err)
	}

	if err != nil {
		context.JSON(status, gin.H{
			"message": message,
			"status": status,
			"error": validation,
			"success": false,
		})
	} else {
		context.JSON(status, gin.H{
			"data": message,
			"status": status,
			"success": true,
		})
	}
}
