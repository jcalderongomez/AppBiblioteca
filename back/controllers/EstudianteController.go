package controllers

import (
	"backend/database"
	"backend/models"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)
func GetEstudiantes(w http.ResponseWriter, r *http.Request) {
    query := `SELECT estudiantes.id, estudiantes.nombre, estudiantes.email, 
                     estudiantes.carrera_id, 
                     carreras.id AS carrera_id, carreras.nombre AS carrera_nombre, carreras.descripcion AS carrera_descripcion
              FROM estudiantes
              JOIN carreras ON estudiantes.carrera_id = carreras.id`

    rows, err := database.DB.Query(query)
    if err != nil {
        http.Error(w, "Error al obtener los estudiantes", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var estudiantes []models.Estudiante
    for rows.Next() {
        var estudiante models.Estudiante
        var carreraId uint
        var carreraNombre, carreraDescripcion string

        // Escanear los datos correctamente
        if err := rows.Scan(&estudiante.Id, &estudiante.Nombre, &estudiante.Email, &estudiante.CarreraId, &carreraId, &carreraNombre, &carreraDescripcion); err != nil {
            http.Error(w, "Error al procesar los datos", http.StatusInternalServerError)
            return
        }

        // Asignar los datos de la carrera al estudiante
        estudiante.Carrera = models.Carrera{
            Id:          carreraId,
            Nombre:      carreraNombre,
            Descripcion: carreraDescripcion,
        }

        estudiantes = append(estudiantes, estudiante)
    }

    // Verifica si hubo un error al iterar sobre las filas
    if err := rows.Err(); err != nil {
        http.Error(w, "Error al iterar sobre los datos", http.StatusInternalServerError)
        return
    }

    // Devuelve la respuesta como JSON
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(estudiantes)
}

// Crear un nuevo estudiante
func CreateEstudiante(w http.ResponseWriter, r *http.Request) {
	var estudiante models.Estudiante

	if err := json.NewDecoder(r.Body).Decode(&estudiante); err != nil {
		http.Error(w, "Error al leer los datos del estudiante", http.StatusBadRequest)
		return
	}

	query := "INSERT INTO estudiantes (nombre, email, carrera_id) VALUES ($1, $2, $3) RETURNING id"
	err := database.DB.QueryRow(query, estudiante.Nombre, estudiante.Email, estudiante.CarreraId).Scan(&estudiante.Id)
	if err != nil {
		http.Error(w, "Error al crear el estudiante", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(estudiante)
}

// Obtener un estudiante por ID
func GetEstudianteByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	estudianteID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de estudiante no válido", http.StatusBadRequest)
		return
	}

	query := "SELECT id, nombre, email, carrera_id FROM estudiantes WHERE id = $1"
	var estudiante models.Estudiante
	err = database.DB.QueryRow(query, estudianteID).Scan(&estudiante.Id, &estudiante.Nombre, &estudiante.Email, &estudiante.CarreraId)
	if err != nil {
		http.Error(w, "Estudiante no encontrado", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(estudiante)
}

// Actualizar un estudiante
func UpdateEstudiante(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	estudianteID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "ID de estudiante no válido", http.StatusBadRequest)
		return
	}

	var estudiante models.Estudiante
	if err := json.NewDecoder(r.Body).Decode(&estudiante); err != nil {
		http.Error(w, "Error al leer los datos del estudiante", http.StatusBadRequest)
		return
	}

	query := "UPDATE estudiantes SET nombre = $1, email = $2, carrera_id = $3 WHERE id = $4"
	_, err = database.DB.Exec(query, estudiante.Nombre, estudiante.Email, estudiante.CarreraId, estudianteID)
	if err != nil {
		http.Error(w, "Error al actualizar el estudiante", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(estudiante)
}

// Eliminar un estudiante
func DeleteEstudiante(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	estudianteID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "IDdde estudiante no válido", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM estudiantes WHERE id = $1"
	_, err = database.DB.Exec(query, estudianteID)
	if err != nil {
		http.Error(w, "Error al eliminar el estudiante", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
