package lib

import "strconv"

func CheckIsTokenValid(store []string, token string) bool {
	for _, t := range store {
		if t == token {
			return true
		}
	}
	return false
}

func GenerateRandomToken(count int) string {
	return "token" + strconv.Itoa(count)
}