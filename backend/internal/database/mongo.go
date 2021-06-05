package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

func Client() (*mongo.Client, context.Context) {
	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	client, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	defer cancel()

	return client, ctx
}
