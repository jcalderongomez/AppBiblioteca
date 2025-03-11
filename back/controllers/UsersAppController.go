package controllers

import (
	"backend/database"
	"backend/models"
	"backend/scripts"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Obtener todos los usersApp
func GetUserApps(w http.ResponseWriter, r *http.Request) {
	query := "SELECT *" +
		" FROM USERS_APP"

	fmt.Println(query) // Para depuración

	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener los users app", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var usersApp []models.UserApp
	for rows.Next() {
		var userApp models.UserApp
		if err := rows.Scan(
			&userApp.Id,
			&userApp.Nombre,
			&userApp.Email,
			&userApp.Password_hash,
			&userApp.Rol,
		); err != nil {
			http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
			return
		}
		usersApp = append(usersApp, userApp)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usersApp)
}

// Crear un nuevo usersApp
func CreateUsersApp(w http.ResponseWriter, r *http.Request) {
	var userApp models.UserApp

	if err := json.NewDecoder(r.Body).Decode(&userApp); err != nil {
		http.Error(w, "Error al leer los datos del usuario", http.StatusBadRequest)
		return
	}

	passwordHash := scripts.ObtenerPassword(userApp.Password_hash)

	query := "INSERT INTO users_app (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id"
	err := database.DB.QueryRow(query, userApp.Nombre, userApp.Email, passwordHash, &userApp.Rol).Scan(&userApp.Id)
	if err != nil {
		http.Error(w, "Error al crear el usuario", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(userApp)
}

// Obtener un usuario por Id
func GetUserAppById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Id inválido", http.StatusBadRequest)
		return
	}

	query := "SELECT nombre, email, password_hash, rol FROM users_app  WHERE id = $1"
	var userApp models.UserApp
	err = database.DB.QueryRow(query, id).Scan(&userApp.Id, &userApp.Nombre, &userApp.Email, &userApp.Password_hash, &userApp.Rol)
	if err != nil {
		http.Error(w, "Usuario no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userApp)
}

func UpdateUserApp(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userAppId, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de usuario no válido", http.StatusBadRequest)
		return
	}

	var userApp models.UserApp
	if err := json.NewDecoder(r.Body).Decode(&userApp); err != nil {
		http.Error(w, "Error al leer los datos del Usuario", http.StatusBadRequest)
		return
	}

	query := "UPDATE users_app SET nombre = $1, email = $2, rol = $3  WHERE id = $4"
	fmt.Println(query)
	_, err = database.DB.Exec(query, userApp.Nombre, userApp.Email, userApp.Rol, userAppId)
	if err != nil {
		http.Error(w, "Error al actualizar el usuario", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "usuario actualizado con éxito",
		"USuario": userApp,
	})
}

func DeleteUserApp(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userAppID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de usuario no válido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM users_app WHERE id = $1"
	_, err = database.DB.Exec(query, userAppID)
	if err != nil {
		http.Error(w, "Error al eliminar el Usuario", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Usuario eliminado con éxito",
	})
}

func DeleteAllUserApp(w http.ResponseWriter, r *http.Request) {
	query := "DELETE FROM users_app"
	_, err := database.DB.Exec(query)
	if err != nil {
		http.Error(w, "Error al eliminar todos los usuarios", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Todos los usuarios fueron eliminados con éxito",
	})
}
