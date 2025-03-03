package models

type Autor struct {
	Id        uint   `json:"id"`
	Nombre    string `json:"nombre"`
	Biografia string `json:"biografia"`
}
