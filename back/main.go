package main

import (
	"backend/database"
	"backend/routes"
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error cargando el archivo .env")
	}

	// Conectar a la base de datos
	database.ConnectDB()

	// Configurar el enrutador usando SetupRoutes()
	router := routes.SetupRoutes()

	// Configurar CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Aplicar middleware CORS
	handler := corsMiddleware.Handler(router)

	fmt.Println("🚀 Servidor corriendo en http://localhost:5000")
	log.Fatal(http.ListenAndServe(":5000", handler))
}
