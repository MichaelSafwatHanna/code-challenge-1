/*a simple dictionary key/value store script*/


var fs       = require('fs');
var path     = require('path');
var filepath = path.join(__dirname, 'dictionary.txt');
var command  = process.argv[2];


var dictionaryObject = {};

//checks if the file exists and make one if it doesn't exist
var fileExist = fs.existsSync(filepath);
if(!fileExist){
    fs.appendFile(filepath, '', (err) => {
        if (err) throw err;
      });
}

switch(command){
    case 'add':
        writeNewKeyValue();
        break;

    case 'list':
        listDictionary();
        break;

    case 'get':
        getValue();
        break;

    case 'remove':
        remove();
        break;

    case 'clear':
        clear();
        break;
        
    case '-h':
        console.log("$ node store.js add mykey myvalue    <adds new key/value to the dictionary>");
        console.log("$ node store.js list                 <lists all keys/values>");
        console.log("$ node store.js get mykey            <prints value of the entered key>");
        console.log("$ node store.js remove mykey         <removes the entered key/value>");
        console.log("$ node store.js clear                <clears all the dictionary lis!>");
        break;
    default:
        console.log("command not found!\n*suggested command: $ node store.js -h");
}

//adds a new entered key/value to our dictionary
function writeNewKeyValue(){
    var myKey      = process.argv[3];
    var myValue    = process.argv[4];

    var newObj     = {};
    newObj[myKey]  = myValue;

    var jsonString = loadDataFromFile();

   if(jsonString!=""){
        dictionaryObject = JSON.parse(jsonString);
        Object.assign(dictionaryObject, newObj);
        writeDictToFile();
   }
   else{
        Object.assign(dictionaryObject, newObj);
        writeDictToFile();
   }
 }

//loads all the dictionary from the file to the object
 function loadDataFromFile(){
     
    var json = fs.readFileSync(filepath, 'utf8');
    if(json!="")
        JSON.parse(json);

    return json;
 }

//writes the modified dictionary object to the file
 function writeDictToFile(){

    var json = JSON.stringify(dictionaryObject);
    fs.writeFile(filepath, json, 'utf8', function (err) {
             if (err) 
                 return console.log(err);
         });

 }

//lists all the dictionary
 function listDictionary(){
    var json         = fs.readFileSync(filepath, 'utf8');
    dictionaryObject = JSON.parse(json);
    var str          = JSON.stringify(dictionaryObject, null, "\t");
    console.log(str);
 }

//gets a value of entered key
 function getValue(){
    dictionaryObject = JSON.parse(loadDataFromFile());
    console.log(dictionaryObject[process.argv[3]]);
 }

 //removes a specific enterd key/value
function remove(){
    var jsonString   = loadDataFromFile();
    dictionaryObject = JSON.parse(jsonString);
    delete(dictionaryObject[process.argv[3]]);
    writeDictToFile();
}

//clear the whole dictionary!
 function clear(){
    dictionaryObject = {};
    fs.writeFile(filepath, "", 'utf8', function (err) {
        if (err) 
            return console.log(err);
        console.log('Dictionary cleared!');
   });
}