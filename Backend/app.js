const express = require("express");
const app = express();
const port = 3000;

var dashboardRouter = require("./routes/dashboard");

app.use("/users", dashboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
