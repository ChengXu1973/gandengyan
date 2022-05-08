import { observer } from "mobx-react";
import { useRef } from "react";
import { MAX_PLAYER, MIN_PLAYER } from "../../consts";
import { api } from "../api/api";
import { useStore } from "../stores";
import { tip } from "./Tips";

export const Create = observer(() => {
    const { user } = useStore();

    const playerRef = useRef<HTMLInputElement>(null);

    const setPlayerCount = () => {
        let value = +(playerRef.current?.value ?? 0);
        value = Math.min(MAX_PLAYER, value);
        value = Math.max(0, value);
        playerRef.current!.value = value.toFixed(0);
    };

    const onCreateRoom = () => {
        const count = +(playerRef.current?.value ?? 0);
        if (count < MIN_PLAYER) {
            tip.info(`至少两个人, 懂?`);
            return;
        }
        api.createRoom(count, user.nickName).catch((err) => {
            console.warn("err", err);
            tip.error("创建房间失败, 刷新一波?");
        });
    };

    return (
        <>
            <input
                type="number"
                placeholder="几个人"
                min="2"
                max="6"
                step="1"
                onChange={setPlayerCount}
                ref={playerRef}
            />
            <div onClick={onCreateRoom} className="button">
                开搞
            </div>
        </>
    );
});
