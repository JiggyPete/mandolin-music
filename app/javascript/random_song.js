let randomSongElement = document.getElementsByClassName("random-song")[0]
randomSongElement.addEventListener('click', function (event) {
  var randomIndex = Math.floor(Math.random() * Math.floor(data.length))
  suggestions.displayAndFocus( data[randomIndex] );
});
