import Peer, { PeerConnectOption } from "peerjs";
import type {
    CardPoint,
    CombinationType,
    MessageType,
    RequestType,
    TipLevel,
} from "./consts";

export type ICallback = (data: any) => void;

export type IBroadcaster = (message: IMessage) => void;

export type INotifier = (message: IMessage, connectId: string) => void;

export interface TipMessage {
    level: TipLevel;
    content: string;
    ts: number;
    key?: number;
    display?: string;
}

export interface ICardsInfo {
    type: CombinationType;
    /** 最小基本值 */
    base: CardPoint;
    /** 阶数：牌的张数，主要用于顺子以及炸弹大小比较 */
    order: number;
    /** 因为王的存在，基本值的向上浮动范围 */
    range: number;
    /** id arr */
    cards: number[];
    /** 手牌打出以后，值就固定下来了 */
    value?: number;
}

export interface IPlayerInfo {
    id: string;
    name: string;
    connection?: Peer.DataConnection;
}

export interface IConnectOption extends PeerConnectOption {
    id?: string;
}

export interface IConnect {
    id?: string;
    init(id?: string): Promise<void>;
    close(): void;
    send<T extends RequestType>(type: T, data: IRequestData<T>): void;
    on(cb: ICallback): void;
    off(cb: ICallback): void;
}

export type IMessageData<T extends MessageType = any> = {
    [MessageType.Room]: IRoomData;
    [MessageType.Game]: IGameData;
    [MessageType.Discard]: boolean;
}[T];

export interface IMessage<T extends MessageType = any> {
    type: T;
    data?: IMessageData<T>;
}

export type IRequestData<T extends RequestType = any> = {
    [RequestType.Discard]: number[];
    [RequestType.Nick]: string;
    [RequestType.Player]: number;
    [RequestType.Restart]: string;
}[T];

export interface IRequest<T extends RequestType = any> {
    peerId: string;
    type: T;
    data?: IRequestData<T>;
}

export interface IRoomData {
    roomId?: string;
}

export interface IGameData {
    seat: number;
    banker: number;
    winner: number[];
    recent: ICardsInfo;
    players: IPlayerInfo[];
    history: IHistory[];
    handcards: number[];
    playerCardCount: number[];
}

export interface IHistory {
    seat: number;
    count: number;
    discard: ICardsInfo;
}

export type IConnections = Record<string, Peer.DataConnection[]>;
