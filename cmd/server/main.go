package main

import "fmt"
import "net/http"

func main(){
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Hello, Fluff-Mallows!")
  })

  fmt.Println("Starting Server on port 8080")
  http.ListenAndServe(":8080", nil)
}
