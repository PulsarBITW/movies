package app

import (
	"movies-backend/configs"
	"movies-backend/internal/router"
)

type App struct {
    router *router.Router 
}
func (a *App) Run(port string) error {
	return a.router.Engine.Run(port) 
}

func CreateApp(appConfig *configs.Config) *App {
    r := router.CreateRouter(appConfig)
    return &App{router: r}
}

