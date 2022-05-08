import {
    CombinationType,
    MessageType,
    PASS,
    PLAYER_PER_SET,
} from "../../consts";
import { IHistory, IMessage, IPlayerInfo } from "../../types";
import { Cards } from "../../utils/cards";
import { Game } from "../gameplay/game";
import { messager } from "../messager";

class GameService {
    private _game?: Game;
    private _bankerShift: number = 0;
    private _clients: IPlayerInfo[] = [];
    private _histories: IHistory[] = [];

    public start(players: IPlayerInfo[], shift: number = 0) {
        this._clients = players;
        this._bankerShift = shift;
        const setCount = Math.ceil(this._clients.length / PLAYER_PER_SET);
        this._histories = [];
        this._shiftPlayer();
        this._game = new Game(setCount, this._clients.length);
        this._notifyGameMessage();
    }

    public discard(connectId: string, cards: number[]) {
        if (!this._game) {
            return;
        }
        console.warn(connectId, cards);
        const seat = this._clients.findIndex((p) => p.id === connectId);
        const info = Cards.GetCardsInfo(cards, this._game.recent?.type);

        let valid = seat === this._game.seat;
        if (cards === PASS) {
            valid &&= this._game.recent !== PASS;
        } else {
            valid &&= info.type !== CombinationType.Invalid;
            valid &&= Cards.CheckCombinationCounter(info, this._game.recent);
        }
        messager.notify({ type: MessageType.Discard, data: valid }, connectId);
        if (!valid) {
            return;
        }
        let gameEnd = false;
        if (cards === PASS) {
            gameEnd = this._game.pass();
        } else {
            gameEnd = this._game.play(info);
        }
        this._histories.push({
            seat,
            discard: info,
            count: this._game.players[seat].cards.length,
        });
        this._notifyGameMessage();
    }

    private _clear() {
        this._game = undefined;
        this._histories = [];
        this._bankerShift = 0;
        this._clients = [];
        this._histories = [];
        this._notifyGameMessage();
    }

    private _shiftPlayer() {
        const origin = this._clients.concat();
        const len = origin.length;
        this._clients = Array(len)
            .fill(null)
            .map((undefined, index) => {
                return origin[(index + this._bankerShift) % len];
            });
    }

    private _notifyGameMessage() {
        this._clients.forEach((client, seat) => {
            if (!this._game) {
                return;
            }
            const player = this._game.players[seat];
            const gameData: IMessage<MessageType.Game> = {
                type: MessageType.Game,
                data: {
                    seat,
                    players: this._clients,
                    banker: this._game.seat,
                    winner: this._game.winner,
                    recent: this._game.recent,
                    handcards: player.cards,
                    playerCardCount: this._game.players.map(
                        (p) => p.cards.length
                    ),
                    history: this._histories,
                },
            };
            messager.notify(gameData, client.id);
        });
    }
}

export const game = new GameService();
