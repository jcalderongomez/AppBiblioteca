package models

// Definir la estructura del libro
type Book struct {
	Id          uint   `json:"id"`
	Titulo      string `json:"titulo"`
	Descripcion string `json:"descripcion"`
	AutorId     uint   `json:"autor_id"`
	Autor       Autor `json:"autor_relacionado"`
}
