var fs = require('fs');

// var baseUrl = "music/nigel-gatherer"
var baseUrl = "http://www.nigelgatherer.com/tunes"


textData = ""
try {
    var template = fs.readFileSync('master-data.json', 'utf8');

    textData = eval(template);
} catch(e) {
    console.log('Error:', e.stack);
}

// console.log(textData)
var json = JSON.parse(textData)

json.sort(function(a,b) {
  if( a["name"] < b["name"] ) {
    return -1;
  }

  if( a["name"] > b["name"] ) {
    return 1;
  }

  return 0;
} );

var outputContents = `data = ${JSON.stringify(json)}`

fs.writeFile('data.json', outputContents, function (err) {
  if (err) return console.log(err);
  console.log('Generated data.json');
});
