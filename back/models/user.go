package models

type User struct {
	ID           uint   `json:"id"`
	Nombre       string `json:"nombre"`
	Email        string `json:"email"`
	Password     string `json:"password"` // Esto es la contraseña que el usuario ingresa
	PasswordHash string `json:"-"`        // Esta es la columna de la base de datos que debe guardar el hash
	Rol          string `json:"rol"`
	CreadoEn     string `json:"creado_en"`
}

