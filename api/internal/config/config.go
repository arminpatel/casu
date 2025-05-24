package config

type Config struct {
	Port string `json:"port"`
}

func LoadConfig() *Config {
	return &Config{
		Port: "8080",
	}
}
