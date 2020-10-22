var fs = require('fs');

var buildJSONStringFor = function(baseUrl) {
  try {
      var template = fs.readFileSync('master-data.json', 'utf8');
      return eval(template);
  } catch(e) {
      console.log('Error:', e.stack);
  }
}

var writeDataFile = function(json, filename, siteName) {
  var outputContents = `data = ${JSON.stringify(json)}`
  fs.writeFile(filename, outputContents, function (err) {
    if (err) return console.log(err);
    console.log("Generated data.json for " + siteName);
  });
}

var extractOnlyNecessaryFieldsFrom = function(json) {
  var result = [];
  json.forEach( function(song) {
    var newSong = {
      "name": song["name"],
      "score": song["score"],
      "tab": song["tab"],
      "audio": song["audio"]
    };

    result.push(newSong);
  })

  return result;
}

var sortJSON = function(json) {
  json.sort(function(a,b) {
    if( a["name"] < b["name"] ) {
      return -1;
    }

    if( a["name"] > b["name"] ) {
      return 1;
    }

    return 0;
  } );
}

var createDataFile = function() {
  textData = buildJSONStringFor("http://www.nigelgatherer.com/tunes")
  var json = JSON.parse(textData)
  sortJSON(json);
  writeDataFile(json, "data.json", "mandolin-music");
}

var createNigelsDataFile = function() {
  textData = buildJSONStringFor("/tunes")
  var json = JSON.parse(textData)
  sortJSON(json);
  json = extractOnlyNecessaryFieldsFrom(json)
  writeDataFile(json, "nigels-data.json", "nigelgatherer.com");
}

createDataFile()
createNigelsDataFile()

