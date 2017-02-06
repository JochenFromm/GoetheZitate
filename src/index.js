/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * A simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * Based on skill-sample-nodejs-fact
 * https://github.com/alexa/skill-sample-nodejs-fact
 * This sample supports only the German language de-DE.
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'goethe_zitat';

const languageStrings = {
    'de-DE': {
        translation: {
            FACTS: [
                'Es hört doch jeder nur, was er versteht.',
                'Es ist nicht genug zu wissen - man muss auch anwenden. Es ist nicht genug zu wollen - man muss auch tun.',
                'Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.',
                'Ironie ist das Körnchen Salz, das das Aufgetischte überhaupt erst genießbar macht.',
                'Es irrt der Mensch, solang er strebt.',
                'Edel sei der Mensch, hilfreich und gut.',
                'Willst du dich am Ganzen erquicken, so musst du das Ganze im Kleinsten erblicken.',
                'Alles Gescheite ist schon gedacht worden, man muss nur versuchen, es noch einmal zu denken.',
                'Was man schwarz auf weiß besitzt, kann man getrost nach Hause tragen.',
                'Die Schwierigkeiten wachsen, je näher man dem Ziele kommt.',
                'Gewöhnlich glaubt der Mensch, wenn er nur Worte hört, es müsse sich dabei doch auch was denken lassen.',
                'Alles auf der Welt kommt auf einen gescheiten Einfall und auf einen festen Entschluss an.',
                'Mir gäb es keine größre Pein, Wär ich im Paradies allein.',
                'Wer nicht neugierig ist, erfährt nichts!',
                'Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.',
                'Die beste Bildung findet ein gescheiter Mensch auf Reisen.',
                'Niemand weiß, wie weit seine Kräfte gehen, bis er sie versucht hat.',
                'Wo viel Licht ist, ist auch viel Schatten.'
            ],
            SKILL_NAME: 'Goethe Zitate auf Deutsch',
            GET_FACT_MESSAGE: 'Hier ist ein Zitat: ',
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
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a quote from the list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

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
