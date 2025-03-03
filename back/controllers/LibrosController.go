package controllers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Obtener todos los libros
func GetBooks(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, titulo, autor_id FROM libros"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener los libros", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var libros []models.Book
	for rows.Next() {
		var libro models.Book
		if err := rows.Scan(&libro.Id, &libro.Titulo, &libro.AutorId); err != nil {
			http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
			return
		}
		libros = append(libros, libro)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(libros)
}

// Crear un nuevo libro
func CreateBook(w http.ResponseWriter, r *http.Request) {
	var libro models.Book

	if err := json.NewDecoder(r.Body).Decode(&libro); err != nil {
		http.Error(w, "Error al leer los datos del libro", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO libros (titulo, autor_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING id"
	err := database.DB.QueryRow(query, libro.Titulo, libro.AutorId).Scan(&libro.Id)
	if err != nil {
		http.Error(w, "Error al crear el libro", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(libro)
}

// Obtener un libro por Id
func GetBookById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Id inválido", http.StatusBadRequest)
		return
	}

	query := "SELECT id, titulo, autor_id FROM libros WHERE id = $1"
	var libro models.Book
	err = database.DB.QueryRow(query, id).Scan(&libro.Id, &libro.Titulo, &libro.AutorId)
	if err != nil {
		http.Error(w, "Libro no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(libro)
}
