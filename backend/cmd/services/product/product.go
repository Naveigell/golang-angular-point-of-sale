package product

import (
	InterfaceProduct "backend/cmd/interfaces/product"
	ProductModel "backend/cmd/models/product"
	ProductRepository "backend/cmd/repositories/product"
	Remover "backend/internal/remover"
	"backend/internal/validator"
	"github.com/google/uuid"
	"net/http"
	"os"
)

type ProductService struct {
	Interface InterfaceProduct.IProduct
}

func (p ProductService) Delete(id string) (string, int) {
	var product = ProductRepository.Retrieve(id)
	if product != nil {
		var pp = product.(ProductModel.Product)
		var path = "backend/assets/imgs/products/" + pp.Image

		var _, err = os.Stat(path)
		if !os.IsNotExist(err) {
			_ = os.Remove(path)
		}
	}

	return ProductRepository.Delete(id)
}

func (p ProductService) Update(id string, product ProductModel.Product) (string, map[string][] string, int, error) {
	var validate = validator.New()
	var messages, success = validate.Validate(product)

	if success {
		var _, status, err = ProductRepository.Update(id, product)

		if err != nil {
			return "Something error", map[string][] string{}, status, err
		}
	} else {
		return "Validation failed", messages, http.StatusUnprocessableEntity, nil
	}

	return "Update product success", map[string][] string{}, http.StatusNoContent, nil
}

func (p ProductService) Retrieve(id string) (interface{}, int) {
	var product = ProductRepository.Retrieve(id)
	var status = http.StatusOK

	if product == nil {
		status = http.StatusNotFound
	}

	return product, status
}

func (p ProductService) All() ([]ProductModel.Product, int)  {
	return ProductRepository.All(), http.StatusOK
}

func (p ProductService) UpdateImage(id string, product ProductModel.Product) (string, map[string][] string, int, error) {
	if product.ImageUploader.Exists() {
		if product.ImageUploader.Only([]string {".jpg", ".png", ".jpeg"}) {
			var pp, _ = p.Retrieve(id)
			if pp != nil {
				var ppp = pp.(ProductModel.Product)
				var status, err = product.ImageUploader.Save("backend/assets/imgs/products", uuid.NewString() + product.ImageUploader.Extensions())

				if err != nil {
					return "Something error", map[string][] string{}, status, err
				}

				_, status, err = ProductRepository.UpdateImage(id, product)
				if err != nil {
					return "Image update failed", map[string][]string{}, status, err
				}

				Remover.File("backend/assets/imgs/products/" + ppp.Image)

				return "Update image success", map[string][]string{}, status, nil
			}

			return "Image valid", map[string][]string{}, http.StatusNoContent, nil
		} else {
			return "Image extension not valid", map[string][] string{
				"image": []string{"image extension not valid"},
			}, http.StatusUnprocessableEntity, nil
		}
	}

	return "Image not exists", map[string][] string{
		"image": []string{"image not exists"},
	}, http.StatusUnprocessableEntity, nil
}

func (p ProductService) Insert(product ProductModel.Product) (string, map[string][] string, int, error) {

	if product.ImageUploader.Exists() {
		if product.ImageUploader.Only([]string {".jpg", ".png", ".jpeg"}) {
			var status, err = product.ImageUploader.Save("backend/assets/imgs/products", uuid.NewString() + product.ImageUploader.Extensions())

			if err != nil {
				return "Something error", map[string][] string{}, status, err
			}

			var validate = validator.New()
			var messages, success = validate.Validate(product)

			if !success {
				return "Validation failed", messages, http.StatusUnprocessableEntity, err
			} else {
				var _, err = ProductRepository.InsertOne(product)
				if err == nil {
					return "Data insert successfully", map[string][] string{}, http.StatusCreated, nil
				} else {
					return "Something error", map[string][] string{}, http.StatusInternalServerError, err
				}
			}
		} else {
			return "Image extension not valid", map[string][] string{
				"image": []string{"image extension not valid"},
			}, http.StatusUnprocessableEntity, nil
		}
	}

	return "Image not exists", map[string][] string{
		"image": []string{"image not exists"},
	}, http.StatusUnprocessableEntity, nil
}
