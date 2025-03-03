package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// LoginHandler maneja la autenticación del usuario
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.User
	var storedUser models.User

	// Leer el cuerpo de la solicitud para depuración
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Println("❌ Error leyendo el cuerpo de la solicitud:", err)
		http.Error(w, "Error en la solicitud", http.StatusBadRequest)
		return
	}
	log.Println("🔍 Cuerpo recibido:", string(body)) // Esto mostrará lo que está enviando Postman

	// Volver a asignar el cuerpo a r.Body para que pueda ser leído nuevamente
	r.Body = io.NopCloser(bytes.NewBuffer(body))

	// Decodificar el JSON recibido
	err = json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		log.Println("❌ Error decodificando JSON:", err)
		http.Error(w, "Error en la solicitud", http.StatusBadRequest)
		return
	}

	// Verificar si la contraseña llegó vacía
	if creds.Password == "" {
		log.Println("⚠️ La contraseña llegó vacía")
		http.Error(w, "La contraseña es requerida", http.StatusBadRequest)
		return
	}
	fmt.Println("Email ingresado:", creds.Email)
	log.Println("✅ Email recibido:", creds.Email)

	// Buscar usuario en BD utilizando SQL
	log.Println("Buscando usuario con email:", creds.Email)
	query := "SELECT id, email, password_hash, nombre, rol FROM usuarios WHERE email = $1 LIMIT 1"
	row := database.DB.QueryRow(query, creds.Email)

	// Asignar los valores del usuario a la estructura storedUser
	err = row.Scan(&storedUser.ID, &storedUser.Email, &storedUser.PasswordHash, &storedUser.Nombre, &storedUser.Rol)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println("❌ Usuario no encontrado")
		} else {
			log.Println("❌ Error en la consulta:", err)
		}
		http.Error(w, "Usuario o contraseña incorrectos", http.StatusUnauthorized)
		return
	}

	// Validar contraseña
	log.Println("🔍 Contraseña ingresada:", creds.Password)
	log.Println("🔐 Hash en BD:", storedUser.PasswordHash)

	if !utils.CheckPassword(creds.Password, storedUser.PasswordHash) {
		log.Println("❌ Contraseña incorrecta")
		http.Error(w, "Usuario o contraseña incorrectos", http.StatusUnauthorized)
		return
	}

	// Generar JWT
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &utils.Claims{
		Email: storedUser.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("yourSecretKey")) // Cambia tu clave secreta aquí
	if err != nil {
		log.Println("❌ Error generando token:", err)
		http.Error(w, "Error al generar el token", http.StatusInternalServerError)
		return
	}

	// Respuesta JSON correcta
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
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
