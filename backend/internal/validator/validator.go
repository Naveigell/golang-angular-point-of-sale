package validator

import (
	"fmt"
	"gopkg.in/go-playground/validator.v9"
	"reflect"
	"strings"
)

type validation struct {
	validator *validator.Validate
}

func New() *validation {
	validate := validator.New()
	// get json tag in struct
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

		if name == "-" {
			return ""
		}

		return name
	})

	return &validation{
		validator: validate,
	}
}

func (v validation) Validate(obj interface{}) (map[string][] string, bool) {
	// error message
	var m = make(map[string][] string, 0)

	var err = v.validator.Struct(obj)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			if m[err.Field()] == nil {
				m[err.Field()] = make([]string, 0)
			}

			var name, _ = reflect.TypeOf(obj).FieldByName(err.StructField())
			var field = err.Field()

			if name.Tag.Get("name") != "" {
				field = name.Tag.Get("name")
			}

			fmt.Println(err.Value())

			switch err.Tag() {
			case "min":
				m[err.Field()] = append(m[err.Field()], field + " minimum is " + err.Param())
				break
			case "eq":
				m[err.Field()] = append(m[err.Field()], field + " must equal with " + err.Param())
				break
			case "gt":
				m[err.Field()] = append(m[err.Field()], field + " must greater than " + err.Param())
				break
			case "gte":
				m[err.Field()] = append(m[err.Field()], field + " must greater than equal " + err.Param())
				break
			case "required":
				m[err.Field()] = append(m[err.Field()], field + " cannot be empty")
				break
			case "max":
				m[err.Field()] = append(m[err.Field()], field + " maximum is " + err.Param())
				break
			}
		}
	}

	if len(m) <= 0 {
		return nil, true
	}
	return m, false
}
