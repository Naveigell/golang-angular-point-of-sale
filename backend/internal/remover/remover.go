package remover

import "os"

func File(path string) bool {
	var _, err = os.Stat(path)
	if err == nil {
		if !os.IsNotExist(err) {
			err = os.Remove(path)
			if err == nil {
				return true
			}
		}
	}

	return false
}
