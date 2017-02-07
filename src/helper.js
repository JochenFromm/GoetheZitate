
const _ = require('lodash');

'use strict';

function getRandomQuote(quotes) {
  var index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function filterList(quotes, keyword) {
  return _.filter(quotes, function(val) {
    return _.includes(val, keyword);
  });
}

function getQuoteForKeyword(quotes, keyword) {
  var filtered_quotes = filterList(quotes, keyword)
  return getRandomQuote(filtered_quotes);
}

var helper = (function (){
  return {
    getRandomQuote: getRandomQuote,
    getQuoteForKeyword: getQuoteForKeyword,
  };
})();

module.exports = helper;