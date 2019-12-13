const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/hrmsMERNSept", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongo is connected");
  })
  .catch(e => {
    console.log("mongo is not connected " + e);
  });
