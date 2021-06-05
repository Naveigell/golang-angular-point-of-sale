package helpers

import (
	"net/http"
	"reflect"
	"strconv"
)

type FormData struct {
	Request *http.Request
}

func (form FormData) Parse(v interface{}, fields []string) {
	var values = reflect.ValueOf(v)

	for i := 0; i < values.Elem().NumField(); i++ {
		for j := 0; j < len(fields); j++ {
			if values.Elem().Type().Field(i).Tag.Get("json") == fields[j] {
				var name = values.Elem().Type().Field(i).Type.Name()
				var value = form.Request.FormValue(fields[j])

				//if name == "string" {
				//	values.Elem().FieldByName(values.Elem().Type().Field(i).Name).SetString(value)
				//} else if name == "uint64" {
				//	number, _ := strconv.ParseUint(value, 10, 64)
				//	values.Elem().FieldByName(values.Elem().Type().Field(i).Name).SetUint(number)
				//}

				switch name {
				case "string":
					values.Elem().FieldByName(values.Elem().Type().Field(i).Name).SetString(value)
					break
				case "uint64":
					number, _ := strconv.ParseUint(value, 10, 64)
					values.Elem().FieldByName(values.Elem().Type().Field(i).Name).SetUint(number)
					break
				}
			}
		}
	}

	//values.Elem().FieldByName("Name").SetString("Es teh")
}
