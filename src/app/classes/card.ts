export class Card {
    get matched(): boolean {
        return this._matched;
    }

    set matched(value: boolean) {
        this._matched = value;
    }
    get flipped(): boolean {
        return this._flipped;
    }

    set flipped(value: boolean) {
        this._flipped = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    private _color: string;
    private _flipped: boolean;
    private _matched: boolean;

    constructor(color: string) {
        this._color = color;
        this._flipped = false;
        this._matched = false;
    }
}
