package main

import (
	"github.com/arminpatel/casu/internal/api"
	"github.com/arminpatel/casu/internal/config"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	r := gin.Default()

	api.RegisterRoutes(r)

	r.Run(":" + cfg.Port)
}
