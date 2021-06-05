package file

import (
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

type Uploader struct {
	File multipart.File
	Handler *multipart.FileHeader

	FullName string
}

func (uploader Uploader) Extensions() string {
	if !uploader.Exists() {
		return ""
	}

	return filepath.Ext(uploader.Handler.Filename)
}

func (uploader Uploader) Exists() bool {
	return uploader.File != nil
}

func (uploader Uploader) Only(array []string) bool {
	if !uploader.Exists() {
		return false
	}

	var extension = uploader.Extensions()

	for i := range array {
		if array[i] == extension {
			return true
		}
	}
	
	return false
}

func (uploader *Uploader) Save(directory string, name string) (int, error) {
	if !uploader.Exists() {
		return http.StatusUnprocessableEntity, errors.New("file doesn't exists")
	}

	defer func() {
		var _ = uploader.File.Close()
	}()

	dir, err := os.Getwd()
	if err != nil {
		return http.StatusInternalServerError, err
	}

	var filename = uploader.Handler.Filename

	if name != "" {
		filename = name
	}

	uploader.FullName = filename

	fileLocation := filepath.Join(dir, directory, filename)
	targetFile, err := os.OpenFile(fileLocation, os.O_WRONLY|os.O_CREATE, os.ModePerm)

	if err != nil {
		return http.StatusInternalServerError, err
	}

	defer func() {
		var _ = targetFile.Close()
	}()

	if _, err := io.Copy(targetFile, uploader.File); err != nil {
		return http.StatusInternalServerError, err
	}

	return http.StatusOK, nil
}