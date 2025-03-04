package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// LoginHandler maneja la autenticación del usuario
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.User
	var storedUser models.User

	// Decodificar el JSON recibido directamente
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		log.Println("❌ Error decodificando JSON:", err)
		http.Error(w, "Error en la solicitud", http.StatusBadRequest)
		return
	}

	// Verificar credenciales en la base de datos
	query := "SELECT id, email, password_hash, nombre, rol FROM users_app WHERE email = $1 LIMIT 1"
	row := database.DB.QueryRow(query, creds.Email)

	// Asignar valores
	if err := row.Scan(&storedUser.ID, &storedUser.Email, &storedUser.PasswordHash, &storedUser.Nombre, &storedUser.Rol); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Usuario o contraseña incorrectos", http.StatusUnauthorized)
			return
		}
		log.Println("❌ Error en la consulta:", err)
		http.Error(w, "Error interno", http.StatusInternalServerError)
		return
	}

	// Validar contraseña
	if !utils.CheckPassword(creds.Password, storedUser.PasswordHash) {
		http.Error(w, "Usuario o contraseña incorrectos", http.StatusUnauthorized)
		return
	}

	// Obtener clave secreta del entorno
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("❌ Error: JWT_SECRET no está configurado")
		http.Error(w, "Error interno", http.StatusInternalServerError)
		return
	}

	// Generar JWT
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &utils.Claims{
		Email: storedUser.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Println("❌ Error generando token:", err)
		http.Error(w, "Error al generar el token", http.StatusInternalServerError)
		return
	}

	// Respuesta JSON
	w.Header().Set("Content-Type", "application/json")
	response := map[string]any{
		"status": "success",
		"token":  tokenString,
		"user": map[string]string{
			"id":     strconv.Itoa(int(storedUser.ID)),
			"nombre": storedUser.Nombre,
			"email":  storedUser.Email,
			"rol":    storedUser.Rol,
		},
	}
	json.NewEncoder(w).Encode(response)
}
