import {Component, Input} from '@angular/core';
import {Card} from '../../classes/card';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    get bgCard(): string {
        const card = this.card;
        let card_color = '#ccc';
        if (card.matched || card.flipped) {
            card_color = card.color;
        }
        return card_color;
    }

    get cardClasses(): Array<string> {
        const card = this.card, classes = [];
        if (card.matched) {
            classes.push('disabled');
        }
        return classes;
    }

    @Input()
    card: Card;

}
