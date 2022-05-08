import Peer from "peerjs";
import { ConnectEvent, StorageKey } from "../consts";

let instance!: Peer;

export const GetPeerInstance = async (): Promise<Peer> => {
    if (instance) {
        return instance;
    }
    return new Promise((resolve, reject) => {
        instance = new Peer(
            localStorage.getItem(StorageKey.PeerId) ?? undefined
        );
        instance.on(ConnectEvent.Error, reject);
        instance.on(ConnectEvent.Open, (id: string) => {
            localStorage.setItem(StorageKey.PeerId, id);
            instance.off(ConnectEvent.Error, reject);
            resolve(instance);
        });
        // @ts-ignore
        window.webrtc = instance;
    });
};
