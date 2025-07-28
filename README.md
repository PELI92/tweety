Welcome to Tweety

This little project will consist initially of 3 microservices within a single monorepo:
- Auth - handles user registration and login verification
- Users - basic CRM
- Tweet - handle everything related to post creation, query and suggestions.

The objective of this project is to practice some new stack and refresh other, mainly but not limited to:
- TypeScript (+2y xp)
- Nest (0 xp)
- MongoDB (+2y xp)
- GraphQL (0 xp)

Other features to practice:
- Load balancer
- Automatic Cloud deploy (trigger when merging to git main)
- Docker compose
- Secrets manager
- Kafka

The idea was to create a basic tweeter-style backend. Mainly focused in user register, follow other users, show followed and recommended tweets.

A simple REST API interface was used for registration and login, while GraphQL is used for querying users to follow and new tweets to show.

NOTE: some decisions were made to practice certain tools and not necessarily as the best solution.


How to test/use
Everything is configured to run a single docker command:

```
docker compose up --build --scale auth=2 --scale user=3 --scale tweet=2
```

This will create the Mongo DB, a basic nginx instance and multiple instance of each microservice. 

The nginx will balance load between each instance

After docker compose is up, you can use swagger:

`http://localhost/auth/api`

`http://localhost/users/api`

`http://localhost/tweets/api` (TODO)

Or can simply curl:

```
curl --location 'localhost:80/auth/login' \
--header 'Content-Type: application/json' \
--data '{
"username": "peli",
"password": "1234"
}'
```


