package handlers

import "net/http"

func ThreeHandler(w http.ResponseWriter, r *http.Request){
 http.ServeFile(w, r, "templates/three.html") 
}
