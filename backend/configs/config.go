package configs

type Config struct {
	Server ServerConfig
}

type ServerConfig struct {
	Port           string
	TrustedProxies []string
	AllowOrigins   []string
}

var TOP_SECRET = []byte("top-secret")

func GetConfig() *Config {
	var (
		ServerPort     = ":8080"
		TrustedProxies = []string{"127.0.0.1"}
		AllowOrigins   = []string{"http://localhost:7045"}
	)

	return &Config{
		Server: ServerConfig{
			Port:           ServerPort,
			TrustedProxies: TrustedProxies,
			AllowOrigins:   AllowOrigins,
		},
	}
}
