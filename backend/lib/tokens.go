package lib

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateTokens(id int, login string, role string, jwtSecret []byte) (accessToken string, refreshToken string,err error) {
	accessClaims := jwt.MapClaims{
		"id":    id,
		"login": login,
		"role":  role,
		"exp":   time.Now().Add(time.Minute * 15).Unix(),
	}

	accessToken, err = generateJWT(accessClaims, jwtSecret)
	if err != nil {
		return "", "", err
	}

	refreshClaims := jwt.MapClaims{
		"id":    id,
		"login": login,
		"role":  role,
		"exp":   time.Now().Add(time.Hour * 24 * 7).Unix(),
	}
	refreshToken, err = generateJWT(refreshClaims, jwtSecret)
	if err != nil {
		return "", "", err
	}

	return
}

func generateJWT(claims jwt.MapClaims, jwtSecret []byte) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

type Claims struct {
	ID    int    `json:"id"`
	Login string `json:"login"`
	Role  string `json:"role"`
	jwt.RegisteredClaims
}

func ParseToken(tokenString string, jwtSecret []byte) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)

	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	if claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, errors.New("token expired")
	}

	return claims, nil
}