import { CombinationType, INITIAL_CARD_COUNT, PASS } from "../../consts";
import { ICardsInfo } from "../../types";
import { Cards } from "../../utils/cards";
import { Player } from "./player";

export class Game {
    /**
     * @param setCount 牌的副数
     */
    public constructor(setCount: number, playerCount: number) {
        this._winner = [];
        this._recent = PASS;
        this._banker = this._seat = 0;
        this._cards = Cards.GetShuffledCards(setCount);
        this._initPlayer(playerCount);
    }

    // --------------------------------- props ---------------------------------

    private _winner: number[];
    /** 胜利的玩家 */
    public get winner(): number[] {
        return this._winner.concat();
    }

    private _seat: number = 0;
    /** 当前玩家座位号 */
    public get seat(): number {
        return this._seat;
    }

    private _players!: Player[];
    /** seat - player */
    public get players(): Player[] {
        return this._players;
    }

    private _recent: ICardsInfo;
    /** 最近出牌 */
    public get recent(): ICardsInfo {
        return this._recent;
    }

    /** id arr */
    private _cards: number[];
    /** 庄家座位号 */
    private _banker: number = 0;

    // --------------------------------- methods ---------------------------------

    /**
     * play cards
     * @returns gameover
     */
    public play(info: ICardsInfo): boolean {
        if (info.type === CombinationType.Invalid) {
            return false;
        }
        const { cards } = info;
        // 移除当前手牌
        this._players[this._seat].removeCards(cards);
        // 手牌为零则玩家胜利
        if (this._players[this._seat].cards.length === 0) {
            this._winner.push(this._seat);
        }
        // 只剩最后一个人时游戏结束
        if (this._players.length - 1 === this._winner.length) {
            return true;
        }
        // 获取下一个玩家座位
        const nextSeat = this._getNextSeat();
        // 切换庄家
        if (this._winner.indexOf(this._seat) > -1) {
            this._banker = nextSeat;
        } else {
            this._banker = this._seat;
        }
        // 切换到下一个玩家
        this._seat = nextSeat;
        // 记录当前出牌
        this._recent = info;
        // 游戏未结束
        return false;
    }

    /** 当前玩家不要 */
    public pass(): boolean {
        if (this._recent === PASS) {
            console.error("首家不能pass");
            return false;
        }
        // 获取下一个玩家座位
        const nextSeat = this._getNextSeat();
        // 切换到下一个玩家
        this._seat = nextSeat;
        // 如果下一位玩家就是庄家,表示应该发牌
        if (this._seat === this._banker) {
            // 清除最近出牌
            this._recent = PASS;
            this._dealCard();
        }
        return false;
    }

    /** 初始化玩家 */
    private _initPlayer(playerCount: number) {
        this._players = Array(playerCount)
            .fill(0)
            .map((undefined, seat) => {
                return new Player(seat);
            });
        // 一人五张
        for (let round = 0; round < INITIAL_CARD_COUNT; round++) {
            this._dealCard();
        }
        // 首家6张牌
        this._dealCardForPlayer(this._banker);
    }

    /** 从庄家开始发一圈牌 */
    private _dealCard() {
        const playerCount = this._players.length;
        for (
            let index = this._banker;
            index < this._banker + playerCount;
            index++
        ) {
            const seat = index % playerCount;
            this._dealCardForPlayer(seat);
        }
    }

    /** 给一个玩家发牌 */
    private _dealCardForPlayer(seat: number) {
        if (this._cards.length === 0) {
            return;
        }
        const player = this._players[seat];
        if (this._winner.indexOf(player.seat) !== -1) {
            return;
        }
        const card = this._cards.shift();
        player.addCard(card!);
    }

    private _getNextSeat() {
        let nextSeat = this._seat;
        do {
            nextSeat++;
            nextSeat %= this._players.length;
        } while (this._winner.indexOf(nextSeat) > -1);
        return nextSeat;
    }
}
