var fs = require('fs');

var buildJSONStringForFile = function(baseUrl, filename) {
  try {
    var template = fs.readFileSync(filename, 'utf8');
    var textData = eval(template);
    return JSON.parse(textData)


    // let result = new Array();

    // result.push(eval( fs.readFileSync('main-data.json', 'utf8') ));
    // result.push(eval( fs.readFileSync('highland-hopscotch.json', 'utf8') ));

    // return result.reduce((acc, val) => acc.concat(val), []);
  } catch(e) {
      console.log('Error:', e.stack);
  }
}

var writeDataFile = function(json, filename, siteName) {
  var date = new Date();
  var outputContents = `
  // Updated on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
  data = ${JSON.stringify(json)}
  `

  fs.writeFile(filename, outputContents, function (err) {
    if (err) return console.log(err);
    console.log("Generated data.json for " + siteName);
  });
}

var extractOnlyNecessaryFieldsFrom = function(json) {
  var result = [];
  json.forEach( function(song) {
    var newSong = { "name": song["name"] };

    if(song["score"]) {
      newSong["score"] = song["score"]
    }

    if(song["tab"]) {
      newSong["tab"] = song["tab"]
    }

    if(song["audio"]) {
      newSong["audio"] = song["audio"]
    }

    if(song["video"]) {
      newSong["video"] = song["video"]
    }

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

var buildJSONFor = function(baseUrl) {
  let result = new Array();
  result.push(buildJSONStringForFile(baseUrl, "data-files/main-data.json"));
  result.push(buildJSONStringForFile(baseUrl, "data-files/hebridean-hopscotch.json"));
  result.push(buildJSONStringForFile(baseUrl, "data-files/world-music.json"));

  return result.reduce((acc, val) => acc.concat(val), []);;
}

var createDataFile = function() {
  var json = buildJSONFor("http://www.nigelgatherer.com/tunes")
  sortJSON(json);
  json = extractOnlyNecessaryFieldsFrom(json)
  writeDataFile(json, "data.json", "mandolin-music");
}

var createNigelsDataFile = function() {
  var json = buildJSONFor("/tunes")
  sortJSON(json);
  json = extractOnlyNecessaryFieldsFrom(json)
  writeDataFile(json, "nigels-data.json", "nigelgatherer.com");
}

createDataFile()
createNigelsDataFile()

