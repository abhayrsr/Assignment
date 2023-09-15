const express = require("express");
const app = express();
const port = 3000;

var dashboardRouter = require("./routes/dashboard");

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use("/users", dashboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
