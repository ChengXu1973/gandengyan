import { RequestType } from "../consts";
import { IRequest } from "../types";
import { game } from "./services/game-service";
import { room } from "./services/room-service";

export const router = (params: IRequest<RequestType>) => {
    const { type, data, peerId } = params;
    switch (type) {
        case RequestType.Player:
            room.setPlayerCount(peerId, data as number);
            break;
        case RequestType.Nick:
            room.addPlayer(peerId, data as string);
            break;
        case RequestType.Restart:
            room.restart(data as string);
            break;
        case RequestType.Discard:
            game.discard(peerId, data as number[]);
            break;
        default:
            break;
    }
};
