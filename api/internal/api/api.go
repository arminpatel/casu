package api

import (
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/api/v1/cas/upload", func(c *gin.Context) {
		file, err := c.FormFile("casFile")
		ctx := c.Request.Context()
		ctxLogger := zerolog.Ctx(ctx)
		if err != nil {
			ctxLogger.Error().Err(err).Msg("Failed to get file from request")
			c.JSON(500, gin.H{
				"error": "Failed to upload file: " + err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"message": "CAS PDF file uploaded successfully",
			"file":    file.Filename,
		})
	})
}
