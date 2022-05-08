import EventEmitter from "eventemitter3";
import { MessageType, PLAYER_PER_SET, RequestType } from "../../consts";
import { ICallback, IConnect, IMessage, IMessageData } from "../../types";
import { localConnect } from "./local-connect";
import { peerConnect } from "./peer-connect";

class Api {
    private _connect?: IConnect;
    private _dispatcher: EventEmitter = new EventEmitter();

    private _clearConnection() {
        this._connect?.off(this._dispatch.bind(this));
        this._connect?.close();
        this._connect = undefined;
    }

    private async _initConnect(local: boolean, roomId?: string) {
        this._clearConnection();
        if (local) {
            this._connect = localConnect;
        } else {
            this._connect = peerConnect;
        }
        await this._connect!.init(roomId);
        this._connect.on(this._dispatch.bind(this));
    }

    private _dispatch(msg: IMessage) {
        this._dispatcher.emit(msg.type, msg.data);
    }

    public get connectId() {
        return this._connect?.id ?? "";
    }

    public async createRoom(player: number = PLAYER_PER_SET, nickName: string) {
        await this._initConnect(true);
        this._connect?.send(RequestType.Player, player);
        this._connect?.send(RequestType.Nick, nickName);
    }

    public async joinRoom(id: string, nickName: string) {
        await this._initConnect(false, id);
        this._connect?.send(RequestType.Nick, nickName);
    }

    public async leaveRoom() {
        this._clearConnection();
        this._dispatch({ type: MessageType.Room });
    }

    public async discardCard(cards: number[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const onDiscard = (data: IMessageData<MessageType.Discard>) => {
                this._dispatcher.off(MessageType.Discard, onDiscard);
                resolve(data);
            };
            this._connect?.send(RequestType.Discard, cards);
            this._dispatcher.on(MessageType.Discard, onDiscard);
        });
    }

    public restart(playerId: string) {
        this._connect?.send(RequestType.Restart, playerId);
    }

    public subscribe(type: MessageType, cb: ICallback) {
        this._dispatcher.on(type, cb);
    }

    public unsubscribe(type: MessageType, cb: ICallback) {
        this._dispatcher.off(type, cb);
    }
}

export const api = new Api();
