  // Search with Suggestions

let matchesFor = function(searchTerm) {
  let results = [];

  data.forEach(function(song) {
    if(song["name"].toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(song);
    }
  } );

  return results;
}

let isCurrentlyTypingThe = function(searchTerm) {
  return ["th", "the", "the ", "he"].includes(searchTerm.toLowerCase()) && searchTerm.length <= 4;
}

let canPerformSearch = function(searchTerm) {
  return searchTerm.length >= 2 && !isCurrentlyTypingThe(searchTerm);
}

document.addEventListener("DOMContentLoaded", function() {
  let searchTermField = document.getElementsByClassName("search--term")[0]


  searchTermField.addEventListener('keydown', function (event) {
    if(event.code === "ArrowDown") {
      suggestions.next();
      return;
    }
  });

  searchTermField.addEventListener('input', function (event) {
    if(canPerformSearch(searchTermField.value)) {
      let searchResults = matchesFor(searchTermField.value)
      if( searchResults.length == 0 ) {
        suggestions.clear()
        suggestions.displayNoResultsMessage();
      } else {
        suggestions.display(searchResults)
      }
    } else {
      suggestions.clear()
    }
  });
});
