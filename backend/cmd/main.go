package main

import (
	"log"
	config "movies-backend/configs"
	"movies-backend/internal/app"
)


func main() {

	appConfig := config.GetConfig()
    application := app.CreateApp(appConfig)

    if err := application.Run(appConfig.Server.Port); err != nil {
        log.Fatalf("При запуске приложения произошла ошибка: %v", err)
    } else {
		log.Println("Сервер запущен на порту",appConfig.Server.Port)
	}
}
