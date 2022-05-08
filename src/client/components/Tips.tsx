import { useState } from "react";
import ReactDOM from "react-dom";
import { TipLevel } from "../../consts";
import { TipMessage } from "../../types";
import { TipsStyle } from "../styles/tips.css";

let messageIndex: number = 0;
let addTip: (message: TipMessage) => void;
let list: TipMessage[] = [];

const DELAY = 1000 * 3;
const ANIM = 1000 * 0.5;

const Tips = () => {
    const [messages, setMessages] = useState<TipMessage[]>([]);
    addTip = (message: TipMessage) => {
        message.key = ++messageIndex;
        list.push(message);
        checkMessages();
    };

    const checkMessages = () => {
        list = list
            .sort((a, b) => {
                return a.key! - b.key!;
            })
            .filter((item) => {
                return Date.now() - item.ts < DELAY + ANIM;
            })
            .map((item) => {
                item.display = Date.now() - item.ts > DELAY ? "fade" : "";
                return item;
            });
        setMessages(list);
        if (list.length) {
            setTimeout(() => {
                checkMessages();
            }, DELAY);
        }
    };

    return (
        <TipsStyle>
            {messages.reverse().map((msg) => (
                <div
                    className={[msg.level, msg.display].join(" ")}
                    key={msg.level + msg.ts}
                >
                    {msg.content}
                </div>
            ))}
        </TipsStyle>
    );
};

let element = document.getElementById("tips-container");
if (!element) {
    element = document.createElement("div");
    element.id = "tips-container";
    document.body.append(element);
}
ReactDOM.render(<Tips />, element);

const info = (content: string) => {
    addTip({ level: TipLevel.Info, ts: Date.now(), content });
};
const warn = (content: string) => {
    addTip({ level: TipLevel.Warn, ts: Date.now(), content });
};
const error = (content: string) => {
    addTip({ level: TipLevel.Error, ts: Date.now(), content });
};

export const tip = { info, warn, error };
