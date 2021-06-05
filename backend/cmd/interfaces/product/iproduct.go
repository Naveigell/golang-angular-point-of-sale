package product

import (
	ProductModel "backend/cmd/models/product"
)

type IProduct interface {
	All() ([]ProductModel.Product, int)
	Insert(product ProductModel.Product) (string, int, error)
	Retrieve(id string) (ProductModel.Product, int)
	Update(product ProductModel.Product) (string, int, error)
}
