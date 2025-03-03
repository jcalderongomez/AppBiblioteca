package utils

import "golang.org/x/crypto/bcrypt"

// HashPassword encripta la contraseña antes de guardarla en la base de datos
func HashPassword(password string) (string, error) {
    hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    return string(hashed), err
}


// CheckPassword compara la contraseña en texto plano con la encriptada
func CheckPassword(password, hashed string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	return err == nil
}
