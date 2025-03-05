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

// Obtener todos los libros
func GetBooks(w http.ResponseWriter, r *http.Request) {
	query := "SELECT " +
		" libros.id AS id," +
		" libros.titulo AS titulo," +
		" libros.id_categoria AS id_categoria," +
		" categorias.nombre AS categoria," +
		" libros.anio_publicacion AS anio_publicacion," +
		" libros.cantidad_disponible AS cantidad_disponible," +
		" libros.id_autor AS id_autor," +
		" autores.nombre AS autor" +
		" FROM libros" +
		" JOIN autores ON libros.id_autor = autores.id" +
		" JOIN categorias ON libros.id_categoria = categorias.id"

	fmt.Println(query) // Para depuración

	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener los libros", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var libros []models.Libro
	for rows.Next() {
		var libro models.Libro
		if err := rows.Scan(
			&libro.Id,
			&libro.Titulo,
			&libro.IdCategoria,
			&libro.Categoria,
			&libro.AnioPublicacion,
			&libro.CantidadDisponible,
			&libro.IdAutor,
			&libro.Autor,
		); err != nil {
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
	var libro models.Libro

	if err := json.NewDecoder(r.Body).Decode(&libro); err != nil {
		http.Error(w, "Error al leer los datos del libro", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO libros (titulo, id_autor, anio_publicacion, genero, cantidad_disponible) VALUES ($1, $2, $3, $4, $5) RETURNING id"
	err := database.DB.QueryRow(query, libro.Titulo, libro.IdAutor, libro.AnioPublicacion, libro.CantidadDisponible).Scan(&libro.Id)
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

	query := "SELECT titulo, id_autor, anio_publicacion, genero, cantidad_disponible FROM libros  WHERE id = $1"
	var libro models.Libro
	err = database.DB.QueryRow(query, id).Scan(&libro.Id, &libro.Titulo, &libro.IdAutor, &libro.AnioPublicacion, &libro.CantidadDisponible)
	if err != nil {
		http.Error(w, "Libro no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(libro)
}

func UpdateLibro(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	libroID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de libro no válido", http.StatusBadRequest)
		return
	}

	var libro models.Libro
	if err := json.NewDecoder(r.Body).Decode(&libro); err != nil {
		http.Error(w, "Error al leer los datos del libro", http.StatusBadRequest)
		return
	}

	query := "UPDATE libros SET titulo = $1, autor_id = $2, anio_publicacion = $3, cantidad_disponible = $4 WHERE id = $5"
	fmt.Println(query)
	_, err = database.DB.Exec(query, libro.Titulo, libro.IdAutor, libro.AnioPublicacion, libro.CantidadDisponible, libroID)
	if err != nil {
		http.Error(w, "Error al actualizar el libro", http.StatusInternalServerError)
		return
	}
	
	

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Libro actualizado con éxito",
		"libro":   libro,
	})
}

func DeleteLibro(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	libroID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de libro no válido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM libros WHERE id = $1"
	_, err = database.DB.Exec(query, libroID)
	if err != nil {
		http.Error(w, "Error al eliminar el libro", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Libro eliminado con éxito",
	})
}

func DeleteAllLibros(w http.ResponseWriter, r *http.Request) {
	query := "DELETE FROM libros"
	_, err := database.DB.Exec(query)
	if err != nil {
		http.Error(w, "Error al eliminar todos los libros", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Todos los libros fueron eliminados con éxito",
	})
}
