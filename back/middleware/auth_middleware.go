package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v4"
)

// AuthMiddleware valida el token JWT
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("🛡️ Middleware ejecutado")

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			fmt.Println("⚠️ No se encontró el token en la cabecera")
			http.Error(w, "No autorizado", http.StatusUnauthorized)
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("método de firma no válido")
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			fmt.Println("❌ Token inválido:", err)
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		fmt.Println("✅ Token válido")
		next.ServeHTTP(w, r)
	})
}
