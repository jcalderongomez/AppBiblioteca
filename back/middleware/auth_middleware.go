package middleware

import (
	"log"
	"net/http"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Agregar un log para saber que la solicitud está pasando por el middleware
		log.Printf("Middleware: Solicitud recibida para %s %s", r.Method, r.URL.Path)

		// Aquí iría la lógica de autenticación con JWT, pero por ahora solo lo mostramos en el log
		// A futuro puedes agregar la validación del JWT aquí

		// Llamar al siguiente handler
		next.ServeHTTP(w, r)
	})
}
