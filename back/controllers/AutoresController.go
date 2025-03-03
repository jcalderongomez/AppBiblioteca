package controllers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Crear un nuevo autor
func CreateAutor(w http.ResponseWriter, r *http.Request) {
	var autor models.Autor

	if err := json.NewDecoder(r.Body).Decode(&autor); err != nil {
		http.Error(w, "Error al leer los datos del autor", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO autores (nombre, biografia) VALUES ($1, $2) RETURNING id"
	err := database.DB.QueryRow(query, autor.Nombre, autor.Biografia).Scan(&autor.Id)
	if err != nil {
		http.Error(w, "Error al crear el autor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Autor creado con éxito",
		"autor":   autor,
	})
}

// Obtener todos los autores
func GetAuthors(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, nombre, biografia FROM autores"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener los autores", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var autores []models.Autor
	for rows.Next() {
		var autor models.Autor
		if err := rows.Scan(&autor.Id, &autor.Nombre, &autor.Biografia); err != nil {
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

	query := "SELECT id, nombre, biografia FROM autores WHERE id = $1"
	var autor models.Autor
	err = database.DB.QueryRow(query, authorID).Scan(&autor.Id, &autor.Nombre, &autor.Biografia)
	if err != nil {
		http.Error(w, "Autor no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"autor": autor})
}

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

	query := "UPDATE autores SET nombre = $1, biografia = $2 WHERE id = $3"
	_, err = database.DB.Exec(query, autor.Nombre, autor.Biografia, authorID)
	if err != nil {
		http.Error(w, "Error al actualizar el autor", http.StatusInternalServerError)
		return
	}

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
