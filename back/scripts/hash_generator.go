package scripts

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	password := "Clave123"
	hashedPassword := ObtenerPassword(password)
	fmt.Println("Contraseña hasheada:", hashedPassword)
}

func ObtenerPassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error al generar el hash:", err)
		return ""
	}
	return string(hash)
}
