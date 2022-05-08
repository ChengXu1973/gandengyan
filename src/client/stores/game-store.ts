import { action, computed, makeObservable, observable } from "mobx";
import { MessageType, PASS } from "../../consts";
import { ICardsInfo, IGameData, IHistory, IPlayerInfo } from "../../types";
import { api } from "../api/api";

class GameStore {
    public constructor() {
        makeObservable(this);
        api.subscribe(MessageType.Game, this._onGameData.bind(this));
    }

    @observable
    public seat: number = 0;

    @observable
    public banker: number = 0;

    @observable
    public winner: number[] = [];

    @observable
    public recent: ICardsInfo = PASS;

    @observable
    public handcards: number[] = [];

    @observable
    public playerCardCount: number[] = [];

    @observable
    public selected: number[] = [];

    @observable
    public history: IHistory[] = [];

    @observable
    public players: IPlayerInfo[] = [];

    @computed
    public get isWin(): boolean {
        return this.winner.indexOf(this.seat) > -1;
    }

    @computed
    public get gameStarted(): boolean {
        return this.playerCardCount.length > 0;
    }

    @computed
    public get gameOver(): boolean {
        return this.winner.length === this.playerCardCount.length - 1;
    }

    @action
    public selectCard(id: number) {
        const cards = this.selected.concat();
        if (this.selected.indexOf(id) === -1) {
            this.selected = [...cards, id];
        } else {
            this.selected = cards.filter((c) => c !== id);
        }
    }

    @action
    public clearSelected() {
        this.selected = [];
    }

    @action
    public clear() {
        this.seat = 0;
        this.banker = 0;
        this.winner = [];
        this.recent = PASS;
        this.handcards = [];
        this.playerCardCount = [];
        this.selected = [];
        this.history = [];
        this.players = [];
    }

    @action
    private _onGameData(data: IGameData) {
        this.seat = data.seat;
        this.banker = data.banker;
        this.winner = data.winner;
        this.recent = data.recent;
        this.handcards = data.handcards;
        this.playerCardCount = data.playerCardCount;
        this.history = data.history;
        this.players = data.players;
        this.selected = [];
    }
}

export const game = new GameStore();
