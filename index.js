var fs = require('fs');
var file = 'evenflow_lyrics.txt';
var stats = fs.statSync(file);
var fileSizeInBytes = stats["size"];

var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
console.log("file size -- " +fileSizeInMegabytes);
var path = require('path');
var format = path.extname(file);
console.log("filename --"+file);
console.log("format --"+format);
// read file from current directory
fs.readFile(file, 'utf8', function (err, data) {

  if (err) throw err;

  var wordsArray = splitByWords(data);
  var wordsMap = createWordMap(wordsArray);
  var finalWordsArray = sortByCount(wordsMap);

  console.log(finalWordsArray);
  console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
    finalWordsArray[0].total + ' times');

});


function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/\s+/);
  return wordsArray;
}


function createWordMap (wordsArray) {

  // create map for word counts
  var wordsMap = {};
  /*
    wordsMap = {
      'Oh': 2,
      'Feelin': 1,
      ...
    }
  */
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;

}


function sortByCount (wordsMap) {

  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
  let file1 = fs.readFileSync("evenflow_lyrics.txt", "utf8");
 let arr = file1.split(/\r?\n/);
  console.log("print the search word with the line number and line ");
arr.forEach((line, idx)=> {
    if(line.includes(key)){
    console.log((idx+1)+':'+  key   +'-----' + line);
    }
}); 
    return {
      name: key,
      
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.total - a.total;
  });

  return finalWordsArray;

}