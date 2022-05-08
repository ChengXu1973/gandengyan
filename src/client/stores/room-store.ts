import { action, computed, makeObservable, observable } from "mobx";
import { MessageType } from "../../consts";
import { IRoomData } from "../../types";
import { api } from "../api/api";

class RoomStore {
    public constructor() {
        makeObservable(this);
        api.subscribe(MessageType.Room, this._onRoomData.bind(this));
    }

    @observable
    public roomId?: string;

    @computed
    public get inRoom(): boolean {
        return !!this.roomId;
    }

    @computed
    public get isHost(): boolean {
        return this.roomId === api.connectId;
    }

    @action
    private _onRoomData(data?: IRoomData) {
        this.roomId = data?.roomId;
    }
}

export const room = new RoomStore();
