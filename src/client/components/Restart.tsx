import { observer } from "mobx-react";
import { api } from "../api/api";
import { useStore } from "../stores";
import { RestartStyle } from "../styles/restart.css";

export const Restart = observer(() => {
    const { room, game } = useStore();

    const rankList = game.winner.map((seat) => game.players![seat]);
    const loser = game.players?.find(
        (p, seat) => game.winner.indexOf(seat) === -1
    );
    rankList.push(loser!);

    const rankStr = ["st", "nd", "rd", "th", "th", "th"];
    const rankComment = [
        "干啥啥不行，打牌第一名",
        `友谊第一，${rankList[1].name}第二`,
        "三人行，必有第三",
        `古人云，三十而立，四是${rankList[3]?.name}`,
        "55555555555555555",
        "失败是成功tm",
    ];

    const onRestart = () => {
        const seat = game.winner[0];
        const playerId = game.players[seat].id;
        api.restart(playerId);
    };

    return (
        <RestartStyle>
            <div className="title">游戏结束</div>
            <div className="rank">
                {rankList.map((player, i) => {
                    return (
                        <div key={player.id}>
                            <span>
                                {i + 1}
                                {rankStr[i]}
                            </span>
                            {player.name}
                            <div className="comment">{rankComment[i]}</div>
                        </div>
                    );
                })}
            </div>
            {room.isHost && (
                <div className="button" onClick={onRestart}>
                    再来亿把
                </div>
            )}
        </RestartStyle>
    );
});
