suggestions = {
  clear: function() {
    this.clearChildren();
  },
  displayNoResultsMessage: function() {
    this.suggestionsListElement().innerHTML = `<div class="no-suggestions">No matches found</div`
  },
  display: function(songMatches) {
    this.clearChildren();

    var element = this.suggestionsListElement()

    var self = this
    songMatches.forEach(function(song) {
      self.addSuggestionTo(element, song);
    })

    this.addListenersTo(element.getElementsByClassName("suggestion") );
  },
  addListenersTo: function(suggestions) {
    self = this
    Array.from(suggestions).forEach( function(suggestion) {
      suggestion.addEventListener('keydown', function(event) {
        if(event.code === "ArrowDown") {
          self.next();
        }
        if(event.code === "ArrowUp") {
          self.previous();
        }
        if(event.code === "Enter" || event.code === "Space") {
          event.srcElement.getElementsByClassName("mandolin-icon")[0].click()
        }
      });
    });
  },
  next: function() {
    var focussedElement = document.activeElement
    if(focussedElement.classList.contains("suggestion")) {
      var nextElement = focussedElement.nextElementSibling
      if(nextElement != null) {
        nextElement.focus();
      }
    } else {
      var suggestions = this.suggestionsListElement().getElementsByClassName("suggestion")
      if(suggestions.length > 0) {
        suggestions[0].focus();
      }
    }
  },
  previous: function() {
    var focussedElement = document.activeElement
    if(focussedElement.classList.contains("suggestion")) {
      var previousElement = focussedElement.previousElementSibling
      if(previousElement != null) {
        previousElement.focus();
      }
    }

  },
  clearChildren: function() {
    this.suggestionsListElement().innerHTML = "";
  },
  addSuggestionTo: function(suggestionsList, song) {
    let existingHTML = suggestionsList.innerHTML;
    let updatedHTML = `${existingHTML} ${this.suggestionTemplate(song)}`
    suggestionsList.innerHTML = updatedHTML;
  },
  suggestionTemplate(song) {
    let tab = this.buildSuggestionFor(song, "tab", "mandolin-icon");
    let score = this.buildSuggestionFor(song, "score", "treble-clef-icon")
    let audio = this.buildSuggestionFor(song, "audio", "cassette-icon")

    return `<span class="suggestion" tabindex="0">
      ${this.buildNameSuggestionFor(song)}
      <span class="suggestion-links">
        ${tab}
        ${score}
        ${audio}
      </span>
    </span>`
  },
  buildNameSuggestionFor(song) {
    var keyPostfix = ""
    if( song["key"] != undefined && song["key"] != "" ) {
      keyPostfix = " in " + song["key"];
    }

    var name = song["name"] + keyPostfix
    return `<span class="suggestion--name">${name}</span>`
  },
  buildSuggestionFor(song, property, iconClass) {

    if( Array.isArray(song[property]) ) {
      var values = song[property];
      var result = "";
      values.forEach(value => result +=  (this.buildSuggestionOutputFor(property, value) + " ", iconClass) );
      return result;
    } else {
      return this.buildSuggestionOutputFor(property, song[property], iconClass)
    }
  },
  buildSuggestionOutputFor(propertyName, propertyValue, iconClass) {
    if( propertyValue == "" ) {
      return "<span></span>"
    }

    result = `<span class="suggestion--${propertyName}">
      <a href="${propertyValue}" target="_blank" class="${iconClass} icon">
      </a>
    </span>`
    return result

  },

  suggestionsListElement() {
    return document.getElementById("suggestions");
  }
}
