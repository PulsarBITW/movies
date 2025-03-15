package router

import (
	config "movies-backend/configs"
	"movies-backend/internal/handlers"
	middlewares "movies-backend/internal/router/middleware_handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Router struct {
    Engine *gin.Engine
}

func CreateRouter(appConfig *config.Config) *Router {
    ginEngine := gin.Default()

    // settings
	err := ginEngine.SetTrustedProxies(nil)
	if err != nil {
		panic(err.Error())
	}

    // middlewares
    ginEngine.Use(cors.New(cors.Config{
		AllowOrigins:     appConfig.Server.AllowOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true, 
	}))
    ginEngine.Use(gin.Logger())
	ginEngine.Use(gin.Recovery())
	ginEngine.Use(middlewares.LoggerIP())
    ginEngine.Use(middlewares.ErrorHandler()) 
    ginEngine.Use(middlewares.AuthMiddleware()) 

    // api handlers
    ginEngine.GET("/api/media", handlers.GetMediaList)
    ginEngine.GET("/api/films", handlers.GetFilms)
    ginEngine.POST("/api/refresh-tokens", handlers.UpdateTokens)
    ginEngine.POST("/api/login/credentials", handlers.LoginByCredentialsHandler)
    ginEngine.POST("/api/login/token", handlers.LoginByTokenHandler)
    ginEngine.POST("/api/login/google", handlers.LoginByGoogleHandler)

   
    return &Router{Engine: ginEngine}
}


