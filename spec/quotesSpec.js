describe("data", function() {
  const quotes = require('./../src/quotes/de.js');

  describe("German quotes", function() {
    it("contains lots of quotes", function() {
      expect(quotes.length).toBe(33);
    });
  });
});

