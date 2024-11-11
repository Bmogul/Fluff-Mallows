package handlers

import (
	"html/template"
	"net/http"
	"path/filepath"
)

type HomeHandler struct {
	templates *template.Template
}

type HomeData struct {
	Title       string
	Description string
}

func NewHomeHandler() (*HomeHandler, error) {
	// Parse templates from the static directory
	tmpl, err := template.ParseFiles(filepath.Join("static", "templates", "home.html"))
	if err != nil {
		return nil, err
	}

	return &HomeHandler{
		templates: tmpl,
	}, nil
}

func (h *HomeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	data := HomeData{
		Title:       "Welcome to Fluff-Mallows",
		Description: "Your premier destination for gourmet marshmallows",
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := h.templates.ExecuteTemplate(w, "home.html", data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
