import {Component, OnInit} from '@angular/core';
import {Card} from './classes/card';

const colors = [
    '#f2a989',
    '#a5c3f6',
    '#97db62',
    '#c10000',
    '#102e82',
    '#e45525'
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    get gameEnded(): boolean {
        return this._foundCouples === (this._gameCards.length / 2);
    }

    get gameMoves(): number {
        return this._gameMoves;
    }

    get gameRunning(): boolean {
        return this._gameRunning;
    }

    private _gameRunning = false;

    private _gameCards: Array<Card>;
    private _gameMoves: number;
    private _foundCouples: number;

    private _currentCard: Card;
    private _cardInterval: any;

    ngOnInit() {
        this.generateCards();
    }

    clearIntervals() {
        if (this._cardInterval) {
            clearInterval(this._cardInterval);
        }
    }

    stopGame() {
        this._gameRunning = false;
        this._currentCard = null;
        this.clearIntervals();
    }

    startGame() {
        this._gameMoves = +0;
        this._foundCouples = +0;
        this._gameRunning = true;
        this.generateCards();
    }

    generateCards() {
        const cards = [];
        colors.forEach((color: string) => {
            cards.push(new Card(color), new Card(color));
        });

        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        this._gameCards = cards;
    }

    showCard(cardIndex: number) {
        if (this._cardInterval) {
            // ALREADY LOCKED
            return;
        }

        const selectedCard = this._gameCards[cardIndex];
        if (selectedCard.matched || selectedCard.flipped) {
            return;
        }

        selectedCard.flipped = true;
        this._gameMoves++;
        if (this._currentCard) {
            if (this._currentCard.color === selectedCard.color) {
                // CARD MATCH
                this.setMatched(this._currentCard, selectedCard);
                this._foundCouples++;
                this._currentCard = null;
                if (this._cardInterval) {
                    clearInterval(this._cardInterval);
                    this._cardInterval = null;
                }
            } else {
                // CARD UNMATCH
                const cardInterval = setInterval(() => {
                    this.setUnflipped(this._currentCard, selectedCard);
                    this._currentCard = null;
                    this._cardInterval = null;
                    clearInterval(cardInterval);
                    this._cardInterval = null;
                }, 2000);
                this._cardInterval = cardInterval;
            }
        } else {
            this._currentCard = selectedCard;
            this._currentCard.flipped = true;
        }
    }


    setMatched(...cards: Array<Card>) {
        cards.forEach((card: Card) => {
            card.matched = true;
            card.flipped = true;
        });
    }

    setUnflipped(...cards: Array<Card>) {
        cards.forEach((card: Card) => {
            card.flipped = false;
        });
    }
}
