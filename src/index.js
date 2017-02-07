/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * A simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * Based on skill-sample-nodejs-fact
 * https://github.com/alexa/skill-sample-nodejs-fact
 * This skill supports only the German language de-DE.
 **/

'use strict';

const Alexa = require('alexa-sdk');

const _ = require('lodash');
const helper = require('./helper.js');
const GERMAN_QUOTES = require('./quotes/de.js')

const APP_ID = 'amzn1.ask.skill.6d5c92b2-93ff-41ab-a526-e0d3bec2dcf5';

const languageStrings = {
  'de-DE': {
    translation: {
      QUOTES: GERMAN_QUOTES,
      SKILL_NAME: 'Goethe Zitate auf Deutsch',
      GET_FACT_MESSAGE: 'Johann Wolfgang von Goethe sagt: ',
      HELP_MESSAGE: 'Du kannst sagen, „Nenne mir ein Goethe Zitat“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
      HELP_REPROMPT: 'Wie kann ich dir helfen?',
      STOP_MESSAGE: 'Auf Wiedersehen!',
    },
  },
};

const handlers = {
  'LaunchRequest': function () {
      this.emit('GetFact');
  },
  'GetNewFactIntentWithSlots': function () {
    var keyword = this.event.request.intent.slots.keyword.value;
    if (keyword != undefined) {
      const quotes = this.t('QUOTES');
      const result = helper.getQuoteForKeyword(quotes, keyword);
      var speechOutput;
      if (result != undefined) {
        speechOutput = "Hier ist ein Goethe Zitat zum Thema "+keyword+": "+result; 
      } else {
        speechOutput = "Ich konnte kein Zitat zum Thema "+keyword+" finden" 
      }
      this.emit(':tellWithCard', speechOutput);
    }
  },
  'GetNewFactIntent': function () {
      this.emit('GetFact');
  },
  'GetFact': function () {
      // Get a quote from the list
      // Use this.t() to get corresponding language data
      const quotes = this.t('QUOTES');
      const randomFact = helper.getRandomQuote(quotes);

      // Create speech output
      const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
      this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
  },
  'AMAZON.HelpIntent': function () {
      const speechOutput = this.t('HELP_MESSAGE');
      const reprompt = this.t('HELP_MESSAGE');
      this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'SessionEndedRequest': function () {
      this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
