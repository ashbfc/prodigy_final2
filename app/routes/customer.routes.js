module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
 
    // By Ashish Ji 
    app.post("/addBankDetail", customers.addBankDetail);//
    app.post("/bankDetails", customers.showDetails);//   //customers ->contrller, showDetails->method
    app.post("/productApi", customers.findAllProducts);
    app.post("/bankverify",customers.bankverify);//
    app.post("/bankverify2",customers.bankverify2);//
    app.get("/users/:emailId", customers.findOne1users);//
    app.get("/test", customers.getnsebank);//
    app.post("/readFatca1",customers.readFatca1_nov);//executed with error
    //app.get("/purchase",customers.purchase);//executed with error
};
