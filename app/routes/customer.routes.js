module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
 
    // By Ashish Ji 
    app.post("/addBankDetail", customers.addBankDetail);
    app.post("/bankDetails", customers.showDetails);   //customers ->contrller, showDetails->method
    app.post("/productApi", customers.findAllProducts);
    app.post("/bankverify",customers.bankverify);
    app.post("/bankverify2",customers.bankverify2);
    app.get("/users/:emailId", customers.findOne1users);
    app.get("/getNSEBank", customers.getnsebank);
    app.post("/readFatca1",customers.readFatca1_nov);
    app.get("/perchase",customers.perchase);//executed with error
  app.post("/changePbank",customers.changePbank);
    app.post("/deletebank",customers.deletebank);
 // app.post("/test",customers.validatekyc);
};
