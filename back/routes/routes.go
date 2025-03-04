package routes

import (
	"backend/controllers"
	"backend/middleware"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	// Rutas públicas (Sin autenticación)
	router.HandleFunc("/api/login", controllers.LoginHandler).Methods(http.MethodPost)

	// 🔹 LOG para asegurarnos de que el router está registrando rutas
	fmt.Println("🚀 Configurando rutas...")

	// Rutas protegidas con autenticación
	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middleware.AuthMiddleware)

	// 🔹 Agregar log para confirmar que el middleware está siendo registrado
	fmt.Println("🔒 Middleware de autenticación activado en rutas protegidas")

	// 🔹 Rutas de Autores
	protected.HandleFunc("/autores", controllers.CreateAutor).Methods(http.MethodPost)
	protected.HandleFunc("/autores", controllers.GetAuthors).Methods(http.MethodGet)
	protected.HandleFunc("/autores/{id:[0-9]+}", controllers.GetAuthorByID).Methods(http.MethodGet)
	protected.HandleFunc("/autores/{id:[0-9]+}", controllers.UpdateAuthor).Methods(http.MethodPut)
	protected.HandleFunc("/autores/{id:[0-9]+}", controllers.DeleteAuthor).Methods(http.MethodDelete)
	protected.HandleFunc("/autores", controllers.DeleteAllAuthors).Methods(http.MethodDelete)

	// 🔹 Rutas de Libros
	protected.HandleFunc("/libros", controllers.GetBooks).Methods(http.MethodGet)
	protected.HandleFunc("/libros", controllers.CreateBook).Methods(http.MethodPost)
	protected.HandleFunc("/libros/{id:[0-9]+}", controllers.GetBookById).Methods(http.MethodGet)

	// 🔹 Rutas de Estudiantes
	protected.HandleFunc("/estudiantes", controllers.CreateEstudiante).Methods(http.MethodPost)
	protected.HandleFunc("/estudiantes", controllers.GetEstudiantes).Methods(http.MethodGet)
	protected.HandleFunc("/estudiantes/{id:[0-9]+}", controllers.GetEstudianteByID).Methods(http.MethodGet)
	protected.HandleFunc("/estudiantes/{id:[0-9]+}", controllers.UpdateEstudiante).Methods(http.MethodPut)
	protected.HandleFunc("/estudiantes/{id:[0-9]+}", controllers.DeleteEstudiante).Methods(http.MethodDelete)

	// 🔹 Rutas de Carreras
	protected.HandleFunc("/carreras", controllers.GetCarreras).Methods(http.MethodGet)
	protected.HandleFunc("/carreras/{id:[0-9]+}", controllers.GetCarreraByID).Methods(http.MethodGet)
	protected.HandleFunc("/carreras", controllers.CreateCarrera).Methods(http.MethodPost)
	protected.HandleFunc("/carreras/{id:[0-9]+}", controllers.UpdateCarrera).Methods(http.MethodPut)
	protected.HandleFunc("/carreras/{id:[0-9]+}", controllers.DeleteCarrera).Methods(http.MethodDelete)

	return router
}
