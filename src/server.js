require("express-async-errors");

const express = require("express");

const app = express();

const PORT = 3333;

const migrationsRun = require("./database/sqlite/migrations");

migrationsRun();

const AppError = require("./utils/AppError");

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const routes = require("./routes");

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});
