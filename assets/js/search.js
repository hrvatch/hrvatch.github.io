(function() {
  function showResults(results, store) {
    var searchResults = document.getElementById('search-results');
    var searchInfo = document.getElementById('search-results-info');
    
    if (results.length) {
      // Show result count
      searchInfo.innerHTML = '<p>Found ' + results.length + ' result' + (results.length > 1 ? 's' : '') + '</p>';
      
      var appendString = '';
      for (var i = 0; i < results.length; i++) {
        var item = store[results[i].ref];
        // Match the posts.html styling
        appendString += '<li class="list-item">';
        appendString += '<a class="list-item-title" href="' + item.url + '">' + item.title + '</a>';
        appendString += ' - <span class="list-item-date">' + item.date + '</span>';
        appendString += '</li>';
      }
      searchResults.innerHTML = appendString;
    } else {
      searchInfo.innerHTML = '';
      searchResults.innerHTML = '<li class="list-item">No results found</li>';
    }
  }
  
  function getQuery(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }
  
  var searchTerm = getQuery('query');
  if (searchTerm) {
    // Display the search term
    var queryDisplay = document.getElementById('search-query-text');
    if (queryDisplay) {
      queryDisplay.textContent = searchTerm;
    }
    
    document.getElementById('search-box').setAttribute("value", searchTerm);
    
    // Initialize lunr.js with the fields to search
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
      
      for (var key in window.store) {
        this.add({
          'id': key,
          'title': window.store[key].title,
          'author': window.store[key].author,
          'category': window.store[key].category,
          'content': window.store[key].content
        });
      }
    });
    
    var results = idx.search(searchTerm);
    showResults(results, window.store);
  }
})();
