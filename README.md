# ddarwin-node-api-express-demo
 Node express api using Serverless Framework

Install the Node modules:
```
  npm install
```

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

