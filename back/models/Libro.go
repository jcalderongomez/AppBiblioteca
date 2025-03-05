package models

type Libro struct {
	Id                 uint   `json:"id" db:"id"`
	Titulo             string `json:"titulo" db:"titulo"`
	IdCategoria        uint   `json:"id_categoria" db:"id_categoria"`
	Categoria          string `json:"categoria" db:"categoria"`
	AnioPublicacion    int    `json:"anio_publicacion" db:"anio_publicacion"`
	CantidadDisponible int    `json:"cantidad_disponible" db:"cantidad_disponible"`
	IdAutor            uint   `json:"id_autor" db:"id_autor"`
	Autor              string `json:"autor" db:"autor"`
}
