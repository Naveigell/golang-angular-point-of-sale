package routes

import (
	"backend/cmd/controllers/product"
	"github.com/gin-gonic/gin"
)

func Run() {
	router := gin.Default()

	ServeStatic(router)

	router.Use(allowCors())

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

func ServeStatic(router *gin.Engine) {
	router.Static("/assets", "backend/assets")
}

func allowCors() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.Header("Access-Control-Allow-Origin", "*")
		context.Header("Access-Control-Allow-Credentials", "true")
		context.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Accept, Origin, Cache-Control, X-Requested-With")
		context.Header("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT")
	}
}
