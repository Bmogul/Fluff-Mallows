package handlers
import "html/template"
import "path/filepath"

func parseTemplates(fileName string) (*template.Template, error) {
    // Parse base, partials, and page templates
    tmpl := template.New("")
    var err error
    tmpl, err = tmpl.ParseGlob("templates/layouts/*.html")
    if err != nil {
        return nil, err
    }
    tmpl, err = tmpl.ParseGlob("templates/components/*.html")
    if err != nil {
        return nil, err
    }
    tmpl, err = tmpl.ParseFiles(filepath.Join("templates/pages", fileName))
    if err != nil {
        return nil, err
    }
    return tmpl, nil
}
