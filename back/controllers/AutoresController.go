package controllers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Crear un nuevo autor
func CreateAutor(w http.ResponseWriter, r *http.Request) {
	var autor models.Autor

	// Decodificar JSON recibido
	if err := json.NewDecoder(r.Body).Decode(&autor); err != nil {
		http.Error(w, "Error al leer los datos del autor", http.StatusBadRequest)
		return
	}

	// Insertar en la base de datos
	query := "INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES ($1, $2, $3) RETURNING id"
	err := database.DB.QueryRow(query, autor.Nombre, autor.Nacionalidad, autor.FechaNacimiento).Scan(&autor.Id)
	if err != nil {
		http.Error(w, "Error al crear el autor", http.StatusInternalServerError)
		return
	}

	// Responder con el JSON del autor creado
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Autor creado con éxito",
		"autor":   autor,
	})
}

// Obtener todos los autores
func GetAuthors(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, nombre, nacionalidad, fecha_nacimiento FROM autores"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener los autores", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var autores []models.Autor
	for rows.Next() {
		var autor models.Autor
		if err := rows.Scan(&autor.Id, &autor.Nombre, &autor.Nacionalidad, &autor.FechaNacimiento); err != nil {
			http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
			return
		}
		autores = append(autores, autor)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"autores": autores})
}

// Obtener un autor por ID
func GetAuthorByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	authorID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de autor no válido", http.StatusBadRequest)
		return
	}

	query := "SELECT id, nombre, nacionalidad, fecha_nacimiento FROM autores WHERE id = $1"
	var autor models.Autor
	err = database.DB.QueryRow(query, authorID).Scan(&autor.Id, &autor.Nombre, &autor.Nacionalidad, &autor.FechaNacimiento)
	if err != nil {
		http.Error(w, "Autor no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"autor": autor})
}

// Actualizar un autor por ID
// Actualizar un autor por ID
func UpdateAuthor(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	authorID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de autor no válido", http.StatusBadRequest)
		return
	}

	var autor models.Autor
	if err := json.NewDecoder(r.Body).Decode(&autor); err != nil {
		http.Error(w, "Error al leer los datos del autor", http.StatusBadRequest)
		return
	}

	// Consulta SQL corregida
	query := "UPDATE autores SET nombre = $1, nacionalidad = $2, fecha_nacimiento = $3 WHERE id = $4"
	_, err = database.DB.Exec(query, autor.Nombre, autor.Nacionalidad, autor.FechaNacimiento, authorID)
	if err != nil {
		http.Error(w, "Error al actualizar el autor", http.StatusInternalServerError)
		return
	}

	// Respuesta JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Autor actualizado con éxito",
		"autor":   autor,
	})
}

// Eliminar un autor por ID
func DeleteAuthor(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	authorID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de autor no válido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM autores WHERE id = $1"
	fmt.Println("Query:", query)
	_, err = database.DB.Exec(query, authorID)
	if err != nil {
		http.Error(w, "Error al eliminar el autor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Autor eliminado con éxito",
	})
}

// Eliminar todos los autores
func DeleteAllAuthors(w http.ResponseWriter, r *http.Request) {
	query := "DELETE FROM autores"
	result, err := database.DB.Exec(query)
	if err != nil {
		http.Error(w, "Error al eliminar los autores", http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, "Error al obtener el resultado de la eliminación", http.StatusInternalServerError)
		return
	}
	if rowsAffected == 0 {
		http.Error(w, "No hay autores para eliminar", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Todos los autores han sido eliminados",
		"deleted": rowsAffected,
	})
}
