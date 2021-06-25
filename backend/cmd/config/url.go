package config

import "fmt"

const Domain = "http://localhost"
const Port = 8080
const ApiVersion = "api/v1"

var FullDomain = fmt.Sprint(Domain, ":", Port, "/")

var ProductsImageUrl = FullDomain + "assets/imgs/products/"
