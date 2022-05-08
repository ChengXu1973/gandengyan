import { IBroadcaster, IMessage, INotifier } from "../types";

let notifier!: INotifier;
let broadcaster!: IBroadcaster;

const init = (
    notifyImp: INotifier = console.error,
    broadcastImp: IBroadcaster = console.error
) => {
    notifier = notifyImp;
    broadcaster = broadcastImp;
};

export const messager = {
    init,
    notify: (message: IMessage, connectId: string) =>
        notifier(message, connectId),
    broadcast: (message: IMessage) => broadcaster(message),
};
