package models

type Autor struct {
	Id             uint   `json:"id"`
	Nombre         string `json:"nombre"`
	Nacionalidad   string `json:"nacionalidad"`
	FechaNacimiento string `json:"fecha_nacimiento"`
}
