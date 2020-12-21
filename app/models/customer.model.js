const sql = require("./db.js");
const Customer = function(customer) {
 
};

Bank.validateKyc = result => {
console.log("Starting...");
var hdh = "SELECT * FROM users WHERE kyc_sts ='0'";
// console.log(hdh);
sql.query(hdh, (err, res) => {
if (err) {
console.log("error: ", err);
result(err, null);
return;
}
if (res.length) {
// console.log("found users: ", res[0]);


var kycarray = res;
kycarray.forEach(function (item) {
var temp = item.phone;
var tmp_pan= item.pan_card;
var temp2 = item.id;
console.log(temp2);
let ash_xml_agamji = {
"ValidatePAN": {
UserId: 'ARN-21399',
Password: 'VTIxMzk5',
PANNo: tmp_pan
}
} //else
// console.log("start chk");
var edge = require('edge');

var createchksum = edge.func(`
async (input) => {
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

string timeStamp = "021017235859";
string inputString = input.ToString();
string saltValue = "FB1DF213-9B9B-323A-B59C-B985FC9BC399";
int maxLength=2;
List<int> a = new List<int>();
string x = timeStamp;
for (int i = 0; i < x.Length; i += maxLength)
{
if ((i + maxLength) < x.Length)
a.Add(int.Parse(x.Substring(i, maxLength)) % 10);
else
a.Add(int.Parse(x.Substring(i)) % 10);
}

List<int> position = a;
string strToEncrypt=inputString;
StringBuilder key = new StringBuilder();
int len = strToEncrypt.Length;

foreach (int xx in position)
{
if (len > xx)
{
if (xx % 2 == 0)
{
key.Append(strToEncrypt[xx]);
}
else
{
key.Append(strToEncrypt[len - 1 - xx]);
}

}
else
{
int newLen = strToEncrypt.Length;
string newStr = strToEncrypt;
while (newLen-1 < xx)
{
newStr = newStr + newStr;
newLen = newStr.Length;
}
key.Append(newStr[xx]);
}
}
string b= key.ToString().Substring(0, (position.Count / 2)) + saltValue + key.ToString().Substring(position.Count / 2);

var csp = new AesCryptoServiceProvider();
csp.Mode = CipherMode.CBC;
csp.Padding = PaddingMode.PKCS7;
var passWord = "Pass@w3rd99";

var salt = b;

//a random Init. Vector. just for testing
String iv = "e163f859e100f399";
var spec = new Rfc2898DeriveBytes(Encoding.UTF8.GetBytes(passWord), Encoding.UTF8.GetBytes(salt), 1000);
byte[] keyn = spec.GetBytes(16);


csp.IV = Encoding.UTF8.GetBytes(iv);
csp.Key = keyn;

ICryptoTransform e = csp.CreateEncryptor();
byte[] inputBuffer = Encoding.UTF8.GetBytes(inputString);
byte[] output = e.TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);

string encrypted = Convert.ToBase64String(output);

return encrypted;



}
`);

createchksum(tmp_pan, function (error, result) {
if (error) throw error;
//console.log(result);
// return result;
chk = result;
});
console.log(chk);
axios.post('https://mfgatewayapi.abslmfbeta.com/ValidatePAN/1.0.0',
ash_xml_agamji,
{
headers:
{
'Checksum': chk,// 'fT26Gs4uE9Ia6fud/egGYw==',
'DateTimeStamp': '02/10/2017 11:58:59 PM',
'Authorization': 'Bearer dac961b3-bce3-3c82-b6ab-f9a30b29eb8e'
}
}).then(res22 => {
// console.log("asas");
console.log(res22.data.ValidatePANResult.IsEKYCVerified);
if (res22.data.ValidatePANResult.IsEKYCVerified == "Y") {
// //http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=bfccapital&Password=obmh6034OB&SenderID=BFCCAP&Phno=9598848185&Msg=Your a/c no. XXXXXXX2719 is credited by Rs.1.02 on -SIGNZY TECHNOLOGIES
smsurl="http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=bfccapital&Password=obmh6034OB&SenderID=BFCCAP&Phno="+temp+"&Msg=Your("+ tmp_pan +") KYC is completed successfully.";
// smsurl = "https://prodigylive.herokuapp.com/getNSEBank";
axios.get(smsurl).then(
(response) => {
var result = response.data;
console.log('Sending SMS');

kycsql = "update users set kyc_sts=1 where users.id=" + temp2;
sql.query(kycsql, function (err, resvd) {
console.log("Your("+tmp_pan+") KYC is completed successfully.", resvd);
// //return (result);
});
},
(error) => {
console.log(error);
}
); //axi
}//if

});//end axi

});//end for
}

// console.log("NSEBanksList: ", res);
result(null, res);
});
};
Customer.findByemailide = (mydata, result) => {
    let email=mydata.email;
    sql.query(`SELECT user_bank.* FROM user_bank INNER JOIN users on users.id=user_bank.user_id where users.email='${email}'`, (err, res) => {   
    console.log("customers: ", res);

    if (res.length) {
      console.log("Bank details found");
      result(null,{ status:200, message:"Bank details found successfully ",  data:res });
      return;
    }
    else{  
      console.log("Bank details not found"); 
      result(null,{ status:200, message:"Bank details not found ",  data:res });
  }
  });
};


 

Customer.m_addBankDetail = (inputData, result) => {

  console.log("m-line29", inputData);

   sql.query(`SELECT * FROM users WHERE email = '${inputData.email}'`, (err, res) => {
    if (res.length) {
      let my_user_id = res[0].id; 
      inputData.user_id=my_user_id; 
      console.log("Email found");
   //   let sql_userbank = `INSERT INTO user_bank (user_id,bank_name,acoount_type,branch,accountNo,fscode,isprimary_bank) VALUES ('${inputData.user_id}', '${inputData.name}','${inputData.account_type}','${inputData.branch}','${inputData.accountno}','${inputData.ifsc}',0)`; 
     let sql_userbank = `INSERT INTO user_bank (user_id,bank_name,acoount_type,branch,accountNo,fscode,isprimary_bank,bank_code) VALUES ('${inputData.user_id}', '${inputData.name}','${inputData.account_type}','${inputData.branch}','${inputData.accountno}','${inputData.ifsc}',0,'${inputData.bank_code}')`; 
     
      sql.query(sql_userbank, function (err, resvv) {

         console.log("created customer: ",resvv);
         result(null,{ status:200, message:"Bank Details added ",  data:resvv });
         
       });
      return;
      }
      else{  
        console.log("Email not found"); 
        result(null,{ status:200, message:"Email not found in users table ." });
      }
 })
 };

/////////////////////////////////////////


Customer.getAllProducts =  (Req_array, result) => {
  // console.log("mm-line-374",Req_array)
   let AMC_CODE=Req_array.AMC_CODE; 
   let ASSET_CLASS=Req_array.ASSET_CLASS;
 
   let REINVEST_TAG=Req_array.REINVEST_TAG;
   let DIV_GW=Req_array.DIV_GW;
 
 
 
    console.log("m-- data is ",REINVEST_TAG);
 
 
   if (typeof ASSET_CLASS !== "undefined") {
     ASSET_CLASS=Req_array.ASSET_CLASS.toLowerCase();
   if(ASSET_CLASS==='equity'){
     ASSET_CLASS_text='EQ';
   }else if(ASSET_CLASS==='debt' || ASSET_CLASS==='income' || ASSET_CLASS==='cash'){
     ASSET_CLASS_text='DEBT';
   }else{
 
     ASSET_CLASS =undefined
   }
 
 }
 
  
 //SELECT * FROM `products` WHERE `PRODUCT_LONG_NAME` LIKE '%Div.%' or PRODUCT_LONG_NAME LIKE '%Dividend%' ORDER BY `PRODUCT_LONG_NAME` ASC
 
 let QS2='';
 if (typeof DIV_GW !== "undefined") {
        DIV_GW=Req_array.DIV_GW.toUpperCase();
 
 if(DIV_GW === "DIVIDEND"){
 
   QS2=  " and ( PRODUCT_LONG_NAME Like '%Div.%' or  PRODUCT_LONG_NAME Like '%Dividend%' ) "
 }else if(DIV_GW === "GROWTH"){
   QS2=  " and ( PRODUCT_LONG_NAME Like '%GW.%' or  PRODUCT_LONG_NAME Like '%Growth%' or  PRODUCT_LONG_NAME Like '%GW%' ) "
 }else{
   QS2=  "and 1=1"
 }
 }
 
 
 
 
 
 
 
 
 
 
 let QS1='';
 if (typeof REINVEST_TAG !== "undefined") {
 
 if(REINVEST_TAG === "Y"){
   QS1=  " and REINVEST_TAG='Y'"
 }else if(REINVEST_TAG === "Z" || REINVEST_TAG === "X" || REINVEST_TAG === "N" ){
   QS1=  " and REINVEST_TAG!='Y' "
 }else{
   QS1=  "and 1=1"
 }
 }
 
 
 
 
 
 
 
 
 
   // var x=ASSET_CLASS;
   let QS='';
   if (typeof ASSET_CLASS === "undefined") {
      QS=  "and 1=1"
   } else {    
     QS=  " and ASSET_CLASS Like '%"+`${ASSET_CLASS_text}`+"%' "
   }
 
  
 
 
  
  let cQS=`SELECT * FROM products where 1=1 and AMC_CODE='${AMC_CODE}' ${QS}  ${QS1} ${QS2}` 
 
   sql.query(cQS, (err, res) => {
     if (err) {
       console.log("error: ", err);
       result(null, err);
       return;
     }
 
     let datacnt= res.length;
 
 
     console.log("the product data are: ", res);
      mking={
       data_count:datacnt,
       data_result:res,
       data_query:cQS
 
      }
 
        result(null, mking);
   });
 };
 
 //////////////////////////////
 Customer.getAllnsebank = result => {
  sql.query("SELECT * FROM banks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("NSEBanksList: ", res);
    result(null, res);
  });
};

 /////////////////////////

   
Customer.findByIdusers = (customerId, result) => {
  console.log("sdfsdfsdf1111111");
  var hdh="SELECT * FROM users WHERE email ='"+`${customerId}`+"'";
  console.log(hdh);
  sql.query(hdh, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


/////////////////////////

Customer.getFatcamm_nov = (email, result) => {

  sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
    console.log("m- line 351 ")
    if (Array.isArray(res) && res.length) {
    if (res[0].hasOwnProperty('email')) {  
    let u_id=res[0].id;
    console.log("m- line 355 ",u_id)
    result(null, res);     }}
    else{     
     console.log("m- line 358 ")
     result(null, res);      
  }  
});

};
 
//////////////////////////////////////
  Customer.perchase_normal  = (email, result) => {

    sql.query("SELECT * FROM users where email='"+`${email}`+"'", (err, res) => {    
      console.log("m- line 351 ")
      if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {  
      let u_id=res[0].id;
      console.log("m- line 355 ",u_id)
      result(null, res);     }}
      else{     
       console.log("m- line 358 ")
       result(null, res);      
    }  
  });
  
  };

     //////////////////////////////////////////
     Customer.change_bank = (email,bank_id, result) => {
      let sqlquery="SELECT *,user_bank.id as bid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where users.email='"+`${email}`+"'";
          
      sql.query(sqlquery, (err, res) => {  
      if (Array.isArray(res) && res.length) {

              let my_user_id = res[0].user_id; 
              let my_bank_id= bank_id;
      console.log("Email found");
      let sql_userbank = "update user_bank set isprimary_bank=0 where user_id="+`${my_user_id}`; 
     
      sql.query(sql_userbank, function (err, resvv) {

        console.log("Bank Details updated to 0: ",my_user_id);
       
        sql_userbank = "update user_bank set isprimary_bank=1 where user_id="+`${my_user_id}`+" and id="+`${my_bank_id}`; 
     
      sql.query(sql_userbank, function (err, resvv) {
        console.log("sql: ",sql_userbank);
        if(resvv.affectedRows>0){
         console.log("Bank Details updated: ",resvv);
        result(null,{ status:200, message:"Bank Details updated "});
         return
        }
        else{
          console.log("Bank Details not updated, bankid not found : ",resvv);
        result(null,{ status:400, message:"Bank Details not updated, bankid not found."});
        }
      });
      });
       
          }
            else{   
              console.log("Email not found"); 
             console.log(sqlquery)
             result(null,{ status:400, message:"Email not found " }); 
          }  
        });
        
        };

        //////////////////////////////////////////
     Customer.delete_bank = (email,bank_id, result) => {
      let sqlquery="SELECT *,user_bank.id as bid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where users.email='"+`${email}`+"'";
          
      sql.query(sqlquery, (err, res) => {  
      if (Array.isArray(res) && res.length) {

              let my_user_id = res[0].user_id; 
              let my_bank_id= bank_id;
      console.log("Email found");
             
        sql_userbank = "delete from user_bank where user_id="+`${my_user_id}`+" and id="+`${my_bank_id}`; 
     
      sql.query(sql_userbank, function (err, resvv) {
        console.log("sql: ",sql_userbank);
        if(resvv.affectedRows>0){
         console.log("Bank Details deleted: ",resvv);
         //console.log("created customer: ",resvv);
         //result(null,{ status:200, message:"Bank Details added ",  data:resvv });
        result(null,{ status:200, message:"Bank Details deleted "});
         return
        }
        else{
          console.log("Bank Details not deleted, bankid not found : ",resvv);
        result(null,{ status:400, message:"Bank Details not deleted, bankid not found."});
       }
      });
      
       
          }
            else{   
              console.log("Email not found"); 
             console.log(sqlquery)
             result(null,{ status:400, message:"Email not found"}); 
          }  
        });
        
        };


module.exports = Customer;

