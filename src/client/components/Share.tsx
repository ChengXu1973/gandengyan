import copy from "copy-to-clipboard";
import { observer } from "mobx-react";
import { useStore } from "../stores";
import { ShareStyle } from "../styles/share.css";
import { tip } from "./Tips";

export const Share = observer(() => {
    const { room } = useStore();

    const onShareLink = () => {
        copy(location.origin + location.pathname + "?room=" + room.roomId, {
            format: "text/plain",
            onCopy: () => {
                tip.info("网址拷起了");
            },
        });
    };

    const onShareId = () => {
        copy(room.roomId!, {
            format: "text/plain",
            onCopy: () => {
                tip.info("房间号拷起了");
            },
        });
    };

    return (
        <ShareStyle>
            <div className="roomid">
                <div className="title">房间号</div>
                <div className="id">{room.roomId}</div>
            </div>
            <div className="button" onClick={onShareLink}>
                复制网址
            </div>
            <div className="button" onClick={onShareId}>
                复制房号
            </div>
        </ShareStyle>
    );
});
