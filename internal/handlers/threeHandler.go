package handlers

import "net/http"

func ThreeHandler(w http.ResponseWriter, r *http.Request){
 http.ServeFile(w, r, "static/templates/three.html") 
}
