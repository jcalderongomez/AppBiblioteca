package models

type UserApp struct {
	Id            uint   `json:"id"`
	Nombre        string `json:"nombre"`
	Email         string `json:"email"`
	Password_hash string `json:"password_hash"`
	Rol           string `json:"rol"`
}
