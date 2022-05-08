import EventEmitter from "eventemitter3";
import Peer from "peerjs";
import { ConnectEvent } from "../consts";
import { IConnections, IMessage } from "../types";
import { GetPeerInstance } from "../utils/peer";
import { messager } from "./messager";
import { router } from "./router";

class Server {
    private _peer!: Peer;
    public socket = new EventEmitter();

    public get peerId() {
        return this._peer.id;
    }

    public async start() {
        this._peer = await GetPeerInstance();
        this._peer.on(ConnectEvent.Connection, this._onPeerConnect.bind(this));
        this.socket.on(ConnectEvent.Send, router);
        this._setMessager();
        return this._peer.id;
    }

    public stop() {
        this._peer.off(ConnectEvent.Connection, this._onPeerConnect.bind(this));
        this.socket.off(ConnectEvent.Send, router);
        for (const peerId in this._peer.connections) {
            const connections = (this._peer.connections as IConnections)[
                peerId
            ];
            connections.forEach((conn) => {
                conn.off(ConnectEvent.Data, router);
                conn.close();
            });
        }
        messager.init();
    }

    private _setMessager() {
        messager.init(
            (message: IMessage, connectId: string) => {
                const connections = (this._peer.connections as IConnections)[
                    connectId
                ];
                connections?.forEach((conn) => conn.send(message));
                if (connectId === this._peer.id) {
                    this.socket.emit(ConnectEvent.Data, message);
                }
            },
            (message: IMessage) => {
                for (const peerId in this._peer.connections) {
                    const connections = (
                        this._peer.connections as IConnections
                    )[peerId];
                    connections.forEach((conn) => {
                        conn.send(message);
                    });
                }
                this.socket.emit(ConnectEvent.Data, message);
            }
        );
    }

    private _onPeerConnect(conn: Peer.DataConnection) {
        conn.on(ConnectEvent.Data, router);
    }
}

export const server = new Server();
