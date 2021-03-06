/* global define */
define(function (require, exports, module) {

	var availableDecks = require('../decks/module');

    module.exports = [function () {
		
		var availableCards = [];
		this.availableDecks = availableDecks;
		
		var currentCard = {};
		var isFront = false;
		
		this.loaded = false;
		
		this.loadCards = function () {
			if (this.selectedDeck === undefined && this.cards === undefined) {
				return;
			}
		
			if (this.selectedDeck === undefined) {
				var allCards = this.cards.split('\n');
				allCards.forEach(function (card) {
					var frontAndBack = card.split('#');
					availableCards.push({
						front: frontAndBack[0],
						back: frontAndBack[1]
					})
				});
			} else {
				availableCards = availableDecks[this.selectedDeck].items;
			}
			
			this.cards = '';
			this.loaded = true;
		}
		
		this.isFront = function () {
			return isFront;
		}
		
		this.nextCard = function () {
			if (!this.loaded) {
				return;
			}
			var cardIndex = Math.floor(Math.random() * availableCards.length);
			currentCard = availableCards[cardIndex];
			this.cardText = currentCard.front;
			isFront = true;
		}
		
		this.flipCard = function () {
			this.cardText = currentCard.back;
			isFront = false;
		}
		
		this.loadedCards = function () {
			return availableCards.length;
		}

    }];
});
