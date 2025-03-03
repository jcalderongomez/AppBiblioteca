package utils

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var JWTKey = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

// GenerateJWT genera un token JWT válido por 1 hora
func GenerateJWT(email string) (string, error) {
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTKey) // ✅ Corrección: usar JWTKey

}
