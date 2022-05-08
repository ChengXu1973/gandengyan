import { Cards } from "../../utils/cards";

export class Player {
    public constructor(seat: number, cards: number[] = []) {
        this.seat = seat;
        this._cards = cards.concat();
    }

    public readonly seat: number;

    private _cards: number[];
    public get cards(): number[] {
        return this._cards.concat();
    }

    public addCard(cardId: number) {
        this._cards.push(cardId);
        this._cards.sort(Cards.SortCardByPoint);
    }

    public removeCards(cards: number[]) {
        this._cards = this._cards.filter((id) => cards.indexOf(id) === -1);
    }
}
