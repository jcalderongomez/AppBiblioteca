package scripts

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// Exportar la función con mayúscula para que sea accesible desde otros paquetes
func ObtainPassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error al generar el hash:", err)
		return ""
	}
	return string(hash)
}
