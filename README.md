# node-api-express-demo
Nodejs api demonstrating the Gremlin Failure Flags solution. 

This repository has instructions for installing to Lambda using the Serverless framework and for building a containerized image for deployment in ECS. 


## To create a Docker container for running in Docker or other containerized platform

A container has been published in Docker Hub, docker.io/dondarwin/nodeexpressapi-debug:latest

To build a new Docker container:
- Build the docker image by running ```docker build . -t yourrepositoryname/your_app_name```.

- Publish the new created container to a your container registry (e.g. Docker Hub, AWS Elastic Container Registry) using ```docker push```.

- Reference the new container image from the ECS Task definition. 


## To install to Lambda using Serverless Framework

Install the Node modules:
```
  npm install
```

Copy your Gremlin public certificate as cert.pem and private key file as key.pem to the root directory of your serverless project. 

Edit the serverless.yaml to set environment variables for [Gremlin Lambda Extension ARN](https://www.gremlin.com/docs/failure-flags/lambda/#adding-the-gremlin-lambda-extension-to-your-lambda-function), Gremlin Team ID, and API endpoint if needed. 
```
  functions:
  api:
    handler: index.handler
    events:
      - httpApi: '*'
    layers:
      - <gremlin-lambda-extension-arn>
    environment:
      GREMLIN_TEAM_ID: <gremlin-team-id>
      GREMLIN_TEAM_CERTIFICATE_FILE: /var/task/cert.pem 
      GREMLIN_TEAM_PRIVATE_KEY_FILE: /var/task/key.pem
      GREMLIN_LAMBDA_ENABLED: true
      FAILURE_FLAGS_ENABLED: true
      GREMLIN_API_ENDPOINT_URL: <gremlin-api-endpoint>
```


Deploy using the Serverless CLI:
```
  sls deploy
```

