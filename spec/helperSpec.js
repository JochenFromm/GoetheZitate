describe("basic helper functions", function() {
  const quotes = require('./../src/quotes/de.js');
  const helper = require('./../src/helper.js');
  const _ = require('lodash');

  it("should get a random quote", function() {
    var quote1 = helper.getRandomQuote(quotes);
    var quote2 = helper.getRandomQuote(quotes);
    expect(_.includes(quotes, quote1)).toBe(true);
    expect(_.includes(quotes, quote2)).toBe(true);
    expect(quote1).not.toEqual(quote2);
  });

  it("should get a quote for a keyword", function() {
    var quotes = ["red quote", "black quote", "blue quote"];
    var quote1 = helper.getQuoteForKeyword(quotes, "red");
    var quote2 = helper.getQuoteForKeyword(quotes, "black");
    var quote3 = helper.getQuoteForKeyword(quotes, "blue");
    expect(quote1).toEqual("red quote");
    expect(quote2).toEqual("black quote");
    expect(quote3).toEqual("blue quote");
  });

  it("should get the right quote for a keyword", function() {
    var quotes = ["very good quote", "bad quote", "real good quote", "good quote"];
    var quote1 = helper.getQuoteForKeyword(quotes, "good");
    expect(_.includes(quote1, 'good')).toBe(true);
  });
});

