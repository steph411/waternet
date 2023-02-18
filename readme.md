This project is a social network for professionals in the water sector
It's built with a HASURA Graphql backend API on top of a postgres Database and a NextJs frontend with Firebase authentication 

##SETUP

1 - Install the Hasura CLI
2 - Initialize the Hasura project inside the ewatergate-api/backend folder (do not Initialize new migrations, use the migrations already present in the repo)
3 - launch the UI and API using the docker-compose file (docker-compose up)


## DEPLOYMENT
1 - Deploy a HASURA instance to a server (self hosted or Hasura cloud)
2 - apply the migrations from the backend folder to the Hasura server
3 - setup environment variables on the NextJs application and deploy
