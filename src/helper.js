
const _ = require('lodash');

'use strict';

function getRandomQuote(quotes) {
  var index = Math.floor(Math.random() * quotes.length);
  var result = quotes[index];
  return result;
}

function getQuoteForKeyword(quotes, keyword) {
  var filtered_quotes = _.filter(quotes, function(val) {
    return _.includes(val, keyword);
  });
  return getRandomQuote(filtered_quotes);
}

var helper = (function (){
  return {
    getRandomQuote: getRandomQuote,
    getQuoteForKeyword: getQuoteForKeyword,
  };
})();

module.exports = helper;