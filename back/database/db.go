package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq" // Importar el driver de PostgreSQL
)

var DB *sql.DB

func ConnectDB() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbSSLMode := os.Getenv("DB_SSLMODE")

	// Construir la cadena de conexión
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPassword, dbName, dbSSLMode,
	)

	fmt.Println("🔍 Cadena de conexión:", dsn)

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("❌ Error al conectar a la base de datos:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("❌ No se pudo hacer ping a la base de datos:", err)
	}

	log.Println("✅ Conexión exitosa a la base de datos")
}
