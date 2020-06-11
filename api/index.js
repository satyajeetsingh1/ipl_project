const express = require("express");
const routes = require("./routes/ipl");
const cores = require('cors')

// const

const port = 8000;

app = express();

app.use(cores())

app.use("/economy", routes);

app.listen(port, (error) => {
  if (error) console.log(error);
  else {
    console.log(`app is running on port: http://127.0.0.1:${port}`);
  }
});
