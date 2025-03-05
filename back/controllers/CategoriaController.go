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

// Crear una nueva categoria
func CreateCategoria(w http.ResponseWriter, r *http.Request) {
	var categoria models.Categoria

	if err := json.NewDecoder(r.Body).Decode(&categoria); err != nil {
		http.Error(w, "Error al leer los datos de la categoria", http.StatusBadRequest)
		return
	}

	if categoria.Nombre == "" {
		http.Error(w, "El nombre es requerido", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO categorias (nombre) VALUES ($1) RETURNING id"

	err := database.DB.QueryRow(query, categoria.Nombre).Scan(&categoria.Id)

	if err != nil {
		http.Error(w, "Error al crear la categoria", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":   "Categoria creada con éxito",
		"categoria": categoria,
	})
}

// Obtener todas las categorias
func GetCategorias(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, nombre FROM categorias"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener las categorias", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var categorias []models.Categoria
	for rows.Next() {
		var categoria models.Categoria
		if err := rows.Scan(&categoria.Id, &categoria.Nombre); err != nil {
			http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
			return
		}
		categorias = append(categorias, categoria)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"categorias": categorias})
}

// Obtener una categoria por ID
func GetCategoriaByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	query := "SELECT id, nombre FROM categorias WHERE id = $1"
	var categoria models.Categoria
	err = database.DB.QueryRow(query, id).Scan(&categoria.Id, &categoria.Nombre)

	if err != nil {
		http.Error(w, "Categoria no encontrada", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"categoria": categoria})
}

// Actualizar una categoria por ID
func UpdateCategoria(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fmt.Println("editando:...")
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	var categoria models.Categoria
	if err := json.NewDecoder(r.Body).Decode(&categoria); err != nil {
		http.Error(w, "Error al leer los datos de la categoria", http.StatusBadRequest)
		return
	}

	query := "UPDATE categorias SET nombre = $1 WHERE id = $2"
	// Imprime la consulta con los valores antes de ejecutarla
	fmt.Println("Query:", query)
	result, err := database.DB.Exec(query, categoria.Nombre, id)
	if err != nil {
		http.Error(w, "Error al actualizar la categoria", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "No se encontró la categoria", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":   "Categoria actualizada con éxito",
		"categoria": categoria,
	})
}

// Eliminar una categoria por ID
func DeleteCategoria(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Entrado a Eliminar")

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Id inválido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM categorias WHERE id = $1"
	fmt.Println("Eliminar--> DELETE FROM categorias WHERE id:", id)
	result, err := database.DB.Exec(query, id)
	if err != nil {
		http.Error(w, "Error al eliminar la categoria", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "No se encontró la categoria", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Categoria eliminada con éxito",
	})
}
