package auth

import "fmt"

type Auth struct {
	token string
}

func (auth Auth) Test() {
	fmt.Print("Auth work")
}