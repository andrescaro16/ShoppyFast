package models

import (
	"bytes"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"strings"

	"github.com/xdg-go/pbkdf2"
)

type AdminAccount struct {
	Username string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}

func (admin *AdminAccount) EncryptPassword() error {
	saltBytes := make([]byte, 16)
	_, err := rand.Read(saltBytes)
	if err != nil {
		return err
	}
	salt := base64.StdEncoding.EncodeToString(saltBytes)
	hash := pbkdf2.Key([]byte(admin.Password), saltBytes, 10000, 32, sha256.New)
	admin.Password = fmt.Sprintf("%s$%s", salt, base64.StdEncoding.EncodeToString(hash))
	return nil
}

func (admin *AdminAccount) ComparePassword(password string) bool {
	saltAndHash := password
	parts := strings.Split(saltAndHash, "$")
	if len(parts) != 2 {
		return false
	}
	salt, _ := base64.StdEncoding.DecodeString(parts[0])
	hash, _ := base64.StdEncoding.DecodeString(parts[1])
	testHash := pbkdf2.Key([]byte(admin.Password), salt, 10000, 32, sha256.New)
	return bytes.Equal(testHash, hash)
}
