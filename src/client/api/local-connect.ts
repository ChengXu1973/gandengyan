import { ConnectEvent, RequestType } from "../../consts";
import { server } from "../../server";
import { ICallback, IConnect, IRequest, IRequestData } from "../../types";

class LocalConnect implements IConnect {
    private _cbList: ICallback[] = [];

    public id?: string;

    public async init() {
        return server.start().then((id) => {
            this.id = id;
        });
    }

    public close(): void {
        server.stop();
        this._cbList.forEach((cb) => this.off(cb));
        this._cbList.length = 0;
    }

    public send<T extends RequestType>(type: T, data: IRequestData<T>): void {
        const req: IRequest<T> = {
            type,
            data,
            peerId: server.peerId,
        };
        server.socket.emit(ConnectEvent.Send, req);
    }

    public on(cb: ICallback): void {
        this._cbList.push(cb);
        server.socket.on(ConnectEvent.Data, cb);
    }

    public off(cb: ICallback): void {
        this._cbList = this._cbList.filter((c) => c !== cb);
        server.socket.off(ConnectEvent.Data, cb);
    }
}

export const localConnect = new LocalConnect();
