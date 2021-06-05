package routes

import (
	"backend/cmd/controllers/product"
	"github.com/gin-gonic/gin"
)

func Run() {
	router := gin.Default()
	var v1 = router.Group("/api/v1")
	{
		v1.GET("/products", product.GetAll)
		v1.POST("/products", product.Insert)
		v1.GET("/products/:id", product.Retrieve)
		v1.PUT("/products/:id", product.Update)
		v1.PATCH("/products/:id/image", product.UpdateImage)
		v1.DELETE("/products/:id", product.Delete)
	}
	_ = router.Run()
}
