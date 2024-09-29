const axios = require("axios");

const checkConfig = (server) => {
  let config = {};

  switch (server) {
    case "production":
      config = {
        baseURL: process.env.API_URL,
      };
      break;
    case "local":
      config = {
        baseURL: process.env.BASE_URL,
      };
      break;
    default:
      break;
  }

  return config;
};

const selectServer = "production";

const { baseURL } = checkConfig(selectServer);

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL,
  headers,
  timeout: 60000,
});

module.exports = api;
