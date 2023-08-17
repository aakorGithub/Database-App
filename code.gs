// doGet() create web apps

function doGet(e){

  // if ... else ...statement to check parameter and show a specific webpage

  if (!e.parameter.page){
    var file=HtmlService.createTemplateFromFile("login");
    var evaluate = file.evaluate();
    var html=evaluate.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      return html; 

  }
  else if(e.parameter.page){
    var file=HtmlService.createTemplateFromFile(e.parameter.page);
    var evaluate = file.evaluate(); 
     var html=evaluate.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return html;
  
  }

}

// getuRL
function getUrl(){
  var url=ScriptApp.getService().getUrl();
  return url;
}

// include(file)

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


// doPost() get data from login form

function doPost(e){
  var account=e.parameter.account;
  var password=e.parameter.password;
  return result(account, password);
}

 
 // result() to validate login data

function result(account, password){
  var iRow=1;
  var checked=false;
  var app = SpreadsheetApp.getActive();
  var sheet=app.getSheetByName("Employees");

  // validation -- if empty

  if (account==""|| password==""){
    var file = HtmlService.createTemplateFromFile("error");
    return file.evaluate();
  }

  // check whether account and password match

while (sheet.getRange(iRow, 2).getValue() != ''){
   if (sheet.getRange(iRow, 2).getValue() == account && sheet.getRange(iRow, 3).getValue() == password){
     checked = true;
     break;
   }
   iRow++;
 }


// if successfully login then show home page

if (!checked){
 // condition 1: wrong account and/or password

    var file = HtmlService.createTemplateFromFile("error");
    return file.evaluate();

} else{
   // condition 2: sucessfully login

     var file = HtmlService.createTemplateFromFile("home");
        // get profle data about who login
        
          file.uid=sheet.getRange(iRow, 1).getValue();
          file.firstname=sheet.getRange(iRow, 4).getValue();
          file.lastname=sheet.getRange(iRow, 5).getValue();
          file.email=sheet.getRange(iRow, 2).getValue();
          file.pic=sheet.getRange(iRow, 6).getValue();



        // insert data to Login Data Sheet

          var app=SpreadsheetApp.getActiveSpreadsheet();
          var spreadsheetName=app.getSheetByName("LoginData")
          var targetRow=1;
          var newRow=[file.uid, file.firstname, file.lastname, file.email, file.pic]
          spreadsheetName.insertRowAfter(targetRow);
          var range=spreadsheetName.getRange(targetRow, 1, 1, newRow.length)
          range.setValues([newRow])

         
   
    return file.evaluate();



}




}




//  ///////////////////////////////////Home

//ASRV
// Comapny Name
function getCompany(){
  var app=SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetName=app.getSheetByName("Company");
  var lastRow=spreadsheetName.getLastRow();
  var range=spreadsheetName.getRange(2,1,1,1);
  var values=range.getValues();
  Logger.log(values);
  return values;

}

// Comapny Desc
function getCompanyDesc(){
  var app=SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetName=app.getSheetByName("Company");
  var lastRow=spreadsheetName.getLastRow();
  var range=spreadsheetName.getRange(2,2,1,1);
  var values=range.getValues();
  Logger.log(values);
  return values;

}


// Company Picture
function getCompanyPic(){
  var app=SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetName=app.getSheetByName("Company");
  var lastRow=spreadsheetName.getLastRow();
  var range=spreadsheetName.getRange(2,3,1,1);
  var values=range.getValues();
  Logger.log(values);
  return values;

}

// Product Name
function getProduct(){
  var app=SpreadsheetApp.getActiveSpreadsheet();
  var spreadsheetName=app.getSheetByName("Product");
  var lastRow=spreadsheetName.getLastRow();
  var range=spreadsheetName.getRange(2,1, lastRow-1, 1);
  var values=range.getValues();
  Logger.log(values);
  return values;


}



/////////////////////////////////////Home


//////////////////////Inventory


// using getInventory() to get data from spreadsheet

function getInventory(){
  var app=SpreadsheetApp.getActiveSpreadsheet();
