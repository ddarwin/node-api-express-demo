const serverless = require("serverless-http");
const express = require("express");
const app = express();
const gremlin = require(`@gremlin/failure-flags`);

app.get("/", async (req, res, next) => {

  //calculate the end and response time for the request
  const startTime = new Date().getTime(); // Get the start time in milliseconds

  responseBody = "Handling / request"

  await gremlin.invokeFailureFlag({
    name: 'ddarwin-leaky-behavior',
    labels: {
      method: req.method,
      path: req.path,
    },
  
    // Log the experiment after it's complete
    behavior: async (experiment) => {
      responseBody += ("<br/>I am consuming a lot of resources.");  
    },
  })

  //calculate the end and response time for the request
  const endTime = new Date().getTime(); // Get the end time in milliseconds
  const responseTime = endTime - startTime; // Calculate the response time in milliseconds


  responseBody += "<br/>Response took "+responseTime+" (ms)"

  res.send("<HTML>"+responseBody+"</HTML>");
});

app.get("/path", async (req, res, next) => {

  //calculate the end and response time for the request
  const startTime = new Date().getTime(); // Get the start time in milliseconds

  responseBody = "Handling Path request"

  try {
    await gremlin.invokeFailureFlag({
      name: 'ddarwin-http-ingress',                 // the name of your failure flag
      labels: {}}) 
  }
  catch(err) {
    responseBody += "<br/>Handling error "+err;
  }
    
  //calculate the end and response time for the request
  const endTime = new Date().getTime(); // Get the end time in milliseconds
  const responseTime = endTime - startTime; // Calculate the response time in milliseconds

  responseBody += "<br/>Path Response took "+responseTime+" (ms)"

  res.send("<HTML>"+responseBody+"</HTML>");
});

app.get("/leak", async (req, res, next) => {

  //calculate the end and response time for the request
  const startTime = new Date().getTime(); // Get the start time in milliseconds

  responseBody = "Handling Leak request"

  if (await gremlin.invokeFailureFlag({ name: 'ddarwin-handle-leak' })) {
    responseBody += ("<br/>Executing Thread Leak Behavior</HTML>");
  } else {
    responseBody += ("<br/>No Leak Experiment Active");
  }
  
  //calculate the end and response time for the request
  const endTime = new Date().getTime(); // Get the end time in milliseconds
  const responseTime = endTime - startTime; // Calculate the response time in milliseconds


  responseBody += "<br/>Leak Response took "+responseTime+" (ms)"

  res.send("<HTML>"+responseBody+"</HTML>");
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);