import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { UrlParam } from "../../utils/url";
import { api } from "../api/api";
import { useStore } from "../stores";
import { tip } from "./Tips";

export const Join = observer(() => {
    const { user } = useStore();

    const roomRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        roomRef.current!.value = UrlParam.roomId;
    }, []);

    const onJoinRoom = () => {
        const roomId = roomRef.current?.value;
        if (!roomId) {
            tip.info("要填房间号, OK?");
            return;
        }
        api.joinRoom(roomId, user.nickName).catch(() => {
            tip.error("加入房间失败, 房主溜了?");
        });
    };

    return (
        <>
            <input type="text" placeholder="房间号" ref={roomRef} />
            <div onClick={onJoinRoom} className="button">
                对头
            </div>
        </>
    );
});
