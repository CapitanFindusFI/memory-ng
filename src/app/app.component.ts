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
        return this._gameEnded;
    }

    get gameMoves(): number {
        return this._gameMoves;
    }

    get gameRunning(): boolean {
        return this._gameRunning;
    }

    get disabledCards(): Array<Card> {
        return this._gameCards.filter((card: Card) => {
            return card.matched;
        });
    }

    private _gameRunning = false;
    private _gameInterval: any;
    private _gameEnded: boolean;

    private _gameCards: Array<Card>;
    private _gameMoves: number;
    private _foundCouples: number;

    private _currentCard: Card;
    private _cardInterval: any;

    ngOnInit() {
        this.generateCards();
    }

    clearIntervals() {
        if (this._gameInterval) {
            clearInterval(this._gameInterval);
        }
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
        this._gameEnded = false;
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
        const selectedCard = this._gameCards[cardIndex];
        if (selectedCard.matched || selectedCard.flipped) {
            return;
        }
        this._gameMoves++;
        if (this._currentCard) {
            if (this._currentCard.color === selectedCard.color) {
                this.setMatched(this._currentCard, selectedCard);
                this.setFlipped(this._currentCard, selectedCard);
                this._foundCouples++;
            } else {
                this.setUnflipped(this._currentCard, selectedCard);
            }
            this._currentCard = null;
            if (this._cardInterval) {
                clearInterval(this._cardInterval);
            }
            if (this._foundCouples === (this._gameCards.length / 2)) {
                this._gameEnded = true;
            }
        } else {
            this._currentCard = selectedCard;
            this._currentCard.flipped = true;
            this._cardInterval = setInterval(() => {
                this.unflipCard(this._currentCard);
            }, 5000);
        }
    }

    unflipCard(selectedCard: Card) {
        selectedCard.flipped = false;
        this._currentCard = null;
        clearInterval(this._cardInterval);
    }


    setMatched(...cards: Array<Card>) {
        cards.forEach((card: Card) => {
            card.matched = true;
        });
    }

    setUnflipped(...cards: Array<Card>) {
        cards.forEach((card: Card) => {
            card.flipped = false;
        });
    }

    setFlipped(...cards: Array<Card>) {
        cards.forEach((card: Card) => {
            card.flipped = true;
        });
    }

}
