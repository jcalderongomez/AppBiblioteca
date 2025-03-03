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

// Crear una nueva carrera
func CreateCarrera(w http.ResponseWriter, r *http.Request) {
	var carrera models.Carrera

	if err := json.NewDecoder(r.Body).Decode(&carrera); err != nil {
		http.Error(w, "Error al leer los datos de la carrera", http.StatusBadRequest)
		return
	}

	if carrera.Nombre == "" || carrera.Descripcion == "" {
		http.Error(w, "El nombre y la descripción son requeridos", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO carreras (nombre, descripcion) VALUES ($1, $2) RETURNING id"

	err := database.DB.QueryRow(query, carrera.Nombre, carrera.Descripcion).Scan(&carrera.Id)

	if err != nil {
		http.Error(w, "Error al crear la carrera", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Carrera creada con éxito",
		"carrera": carrera,
	})
}

// Obtener todas las carreras
func GetCarreras(w http.ResponseWriter, r *http.Request) {
	query := "SELECT id, nombre, descripcion FROM carreras"
	rows, err := database.DB.Query(query)
	if err != nil {
		http.Error(w, "Error al obtener las carreras", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var carreras []models.Carrera
	for rows.Next() {
		var carrera models.Carrera
		if err := rows.Scan(&carrera.Id, &carrera.Nombre, &carrera.Descripcion); err != nil {
			http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
			return
		}
		carreras = append(carreras, carrera)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"carreras": carreras})
}

// Obtener una carrera por ID
func GetCarreraByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	query := "SELECT id, nombre, descripcion FROM carreras WHERE id = $1"
	var carrera models.Carrera
	err = database.DB.QueryRow(query, id).Scan(&carrera.Id, &carrera.Nombre, &carrera.Descripcion)

	if err != nil {
		http.Error(w, "Carrera no encontrada", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"carrera": carrera})
}

// Actualizar una carrera por ID
func UpdateCarrera(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	var carrera models.Carrera
	if err := json.NewDecoder(r.Body).Decode(&carrera); err != nil {
		http.Error(w, "Error al leer los datos de la carrera", http.StatusBadRequest)
		return
	}

	query := "UPDATE carreras SET nombre = $1, descripcion = $2 WHERE id = $3"
	result, err := database.DB.Exec(query, carrera.Nombre, carrera.Descripcion, id)
	if err != nil {
		http.Error(w, "Error al actualizar la carrera", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "No se encontró la carrera", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Carrera actualizada con éxito",
		"carrera": carrera,
	})
}

// Eliminar una carrera por ID
func DeleteCarrera(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Entrado a Eliminar");
	
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Id inválido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM carreras WHERE id = $1"
	fmt.Println("Eliminar--> DELETE FROM carreras WHERE id:",id);
	result, err := database.DB.Exec(query, id)
	if err != nil {
		http.Error(w, "Error al eliminar la carrera", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "No se encontró la carrera", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Carrera eliminada con éxito",
	})
}
