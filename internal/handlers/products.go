package handlers

import (
	"net/http"
)

type Products struct {
	Title       string
	Description string
	Price       float64
}

type PageDataP struct {
	Title    string
	Products []Products
}


func ProductPageHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := parseTemplates("products.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := PageDataP{
		Title: "Product Page",
		Products: []Products{
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
	}
	tmpl.ExecuteTemplate(w, "informational.html", data)
	http.ServeFile(w, r, "templates/product.html")
}
