package models

type Estudiante struct {
	Id        uint     `json:"id"`
	Nombre    string   `json:"nombre"`
	Email     string   `json:"email"`
	CarreraId uint     `json:"carrera_id"`
	Carrera   Carrera `json:"carrera_relacionada"`
}
