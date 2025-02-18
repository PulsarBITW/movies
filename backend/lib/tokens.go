package lib

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// #TODO: Use different generation strategies for access and refresh tokens

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


type GoogleClaims struct {
    Iss            string `json:"iss"`             // Должно быть "https://accounts.google.com"
    Azp           string `json:"azp"`             // Client ID приложения
    Aud           string `json:"aud"`             // Должно совпадать с вашим CLIENT_ID
    Sub           string `json:"sub"`             // Уникальный идентификатор пользователя
    Email         string `json:"email"`           // Email пользователя
    EmailVerified bool   `json:"email_verified"`  // Подтвержден ли email
    Nbf           int64  `json:"nbf"`             // Not Before - время, раньше которого токен невалиден
    Name          string `json:"name"`            // Имя пользователя
    Picture       string `json:"picture"`         // URL аватарки пользователя
    GivenName     string `json:"given_name"`      // Имя
    FamilyName    string `json:"family_name"`     // Фамилия
    Iat           int64  `json:"iat"`             // Issued At - время выпуска токена (Unix timestamp)
    Exp           int64  `json:"exp"`             // Expiration - время истечения токена (Unix timestamp)
    Jti           string `json:"jti"`             // Уникальный идентификатор токена
}

func ParseGoogleOAuth2Token(tokenString string) (*GoogleClaims, error) {
    token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
    if err != nil {
        return nil, err
    }

    if claims, ok := token.Claims.(jwt.MapClaims); ok {
        jsonData, _ := json.Marshal(claims)
        var googleClaims GoogleClaims
        json.Unmarshal(jsonData, &googleClaims)
        return &googleClaims, nil
    }

    return nil, fmt.Errorf("invalid token")
}