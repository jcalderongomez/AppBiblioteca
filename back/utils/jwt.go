package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var JWTKey = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// GenerateJWT genera un token JWT válido por 1 hora
func GenerateJWT(email string) (string, error) {
	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime), // ✅ Forma correcta
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTKey)
}
