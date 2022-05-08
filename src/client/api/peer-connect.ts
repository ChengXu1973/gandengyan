import Peer from "peerjs";
import { ConnectEvent, RequestType } from "../../consts";
import { ICallback, IConnect, IRequest, IRequestData } from "../../types";
import { GetPeerInstance } from "../../utils/peer";

class PeerConnect implements IConnect {
    private _connection?: Peer.DataConnection;
    private _cbList: ICallback[] = [];
    public id?: string;

    public async init(id: string): Promise<void> {
        const peerInstance = await GetPeerInstance();
        this.id = peerInstance.id;
        this._connection = peerInstance.connect(id);
        return new Promise((resolve, reject) => {
            peerInstance.on(ConnectEvent.Error, reject);
            this._connection!.on(ConnectEvent.Open, () => {
                peerInstance.off(ConnectEvent.Error, reject);
                console.log("peer connect open", id);
                resolve();
            });
        });
    }

    public close(): void {
        this._cbList.forEach((cb) => this.off(cb));
        this._cbList.length = 0;
        this._connection?.close();
        this._connection = undefined;
        this.id = undefined;
    }

    public send<T extends RequestType>(type: T, data: IRequestData<T>): void {
        const req: IRequest<T> = {
            type,
            data,
            peerId: this.id!,
        };
        this._connection?.send(req);
    }

    public on(cb: ICallback): void {
        this._cbList.push(cb);
        this._connection?.on(ConnectEvent.Data, cb);
    }

    public off(cb: ICallback): void {
        this._cbList = this._cbList.filter((c) => c !== cb);
        this._connection?.off(ConnectEvent.Data, cb);
    }
}

export const peerConnect = new PeerConnect();
