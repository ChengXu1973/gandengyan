import { observer } from "mobx-react";
import React, { ReactElement } from "react";
import { CombinationType } from "../../consts";
import { IHistory } from "../../types";
import { useStore } from "../stores";
import { HistoryStyle } from "../styles/history.css";
import { Card } from "./Card";

export const History = observer((prop: { history: IHistory }): ReactElement => {
    const { history } = prop;
    const { game } = useStore();

    const playerName = game.players![history.seat]?.name ?? "";
    const pass = history.discard.type === CombinationType.Invalid;
    const win = history.count === 0;

    return (
        <HistoryStyle>
            <div className="player">
                <div>
                    {playerName}:{pass && " 不要"}
                    {win && " 溜了!"}
                </div>
                {!win && (
                    <span className={history.count <= 2 ? "few" : ""}>
                        (还剩{history.count}张牌)
                    </span>
                )}
            </div>
            {!pass && (
                <div className="cards">
                    {history.discard.cards.map((id) => {
                        return (
                            <div className="card-wrapper" key={id}>
                                <Card cardId={id} />
                            </div>
                        );
                    })}
                </div>
            )}
        </HistoryStyle>
    );
});
