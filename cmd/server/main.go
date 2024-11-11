package main

import "fmt"
import "net/http"
import "log"
import "fluff-mallows/internal/handlers"

func main() {
	// Initialize the home handler
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	homeHandler, err := handlers.NewHomeHandler()
	if err != nil {
		log.Fatal("Failed to initialize home handler:", err)
	}

	// Register routes
	http.Handle("/", homeHandler)

  http.HandleFunc("/3d", handlers.ThreeHandler)

	// Start server
	fmt.Println("Starting Server on port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
