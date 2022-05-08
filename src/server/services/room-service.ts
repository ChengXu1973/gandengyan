import { MessageType, PLAYER_PER_SET } from "../../consts";
import { IPlayerInfo } from "../../types";
import { messager } from "../messager";
import { game } from "./game-service";

class RoomService {
    private _roomId?: string;
    private _playerCount: number = 0;
    private _players: IPlayerInfo[] = [];

    public setPlayerCount(roomId: string, player: number = PLAYER_PER_SET) {
        this._playerCount = player;
        this._players.length = 0;
        this._roomId = roomId;
        this._boardcastRoomInfo();
    }

    public addPlayer(id: string, name: string) {
        if (this._players.length < this._playerCount) {
            this._players.push({ id, name });
            if (this._players.length === this._playerCount) {
                game.start(this._players);
            }
        }
        this._boardcastRoomInfo();
    }

    public restart(id: string) {
        const banker = this._players.findIndex((p) => p.id === id);
        game.start(this._players, banker);
    }

    private _boardcastRoomInfo() {
        console.warn("_broadcastRoomInfo", this._players);
        messager.broadcast({
            type: MessageType.Room,
            data: { roomId: this._roomId },
        });
    }
}

export const room = new RoomService();
