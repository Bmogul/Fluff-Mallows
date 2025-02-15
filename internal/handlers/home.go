package handlers

import (
	"net/http"
  "fmt"
)

type Feature struct {
	Icon        string
	Title       string
	Description string
}

type Product struct {
	Title       string
	Description string
	Price       float64
}

type PageData struct {
	Title    string
	Products []Product
	Features []Feature
}



func HomeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := parseTemplates("home.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageData{
		Title: "Home",
		Products: []Product{
			{
				Title:       "Origianl Fluff -Mallows-",
				Description: "The original mallow in our line up, with a hint of vanilla it is the perfect treat to satisfy your Fluffmallow needs!",
				Price:       5.99,
			},
			{
				Title:       "Rose",
				Description: "Infused with natural rose tea and splash of rose syrup, this mallow is a new twist on the unforgettable classic",
				Price:       9.99,
			},
			{
				Title:       "Mint",
				Description: "The perfect after dinner mint, this mallow was made for our minty fresh friends. ",
				Price:       9.99,
			},
		},
		Features: []Feature{
			{Icon: "🌿", Title: "All Natural", Description: "Made with organic ingredients and natural flavors"},

			{
				Icon:        "🏆",
				Title:       "Handcrafted",
				Description: "Small batches made with love and attention",
			},
			{
				Icon:        "✨",
				Title:       "Unique Flavors",
				Description: "Innovative combinations you won't find anywhere else",
			},
		},
	}

	err = tmpl.ExecuteTemplate(w, "informational.html", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
  fmt.Println("return");
}
