package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	password := "clave123" // La contraseña que quieres encriptar
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error al encriptar la contraseña:", err)
		return
	}

	fmt.Println("Contraseña encriptada:", string(hashedPassword))
}
