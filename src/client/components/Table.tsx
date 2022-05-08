import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { useStore } from "../stores";
import { TableStyle } from "../styles/table.css";
import { Hand } from "./Hand";
import { History } from "./History";
import { Panel } from "./Panel";
import { Restart } from "./Restart";

export const Table = observer(() => {
    const { game } = useStore();

    const tipRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        tipRef.current?.scrollIntoView();
    });

    const isSelf = game.banker === game.seat;
    const playerName = game.players![game.banker]?.name;

    return (
        <TableStyle isSelf={isSelf}>
            <div className="list-container">
                <div className="list">
                    {game.history.map((his, i) => (
                        <History key={i} history={his} />
                    ))}
                    <div className="tips" ref={tipRef}>
                        {isSelf ? "该出牌了" : `等待${playerName}出牌`}
                    </div>
                </div>
            </div>
            <div className="bottom">
                {game.isWin ? (
                    <div className="win">赢了撒✌️</div>
                ) : (
                    <>
                        <Hand />
                        <Panel />
                    </>
                )}
            </div>
            {game.gameOver && <Restart />}
        </TableStyle>
    );
});
