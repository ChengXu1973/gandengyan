import { observer } from "mobx-react";
import { PASS } from "../../consts";
import { api } from "../api/api";
import { useStore } from "../stores";
import { PanelStyle } from "../styles/panel.css";
import { tip } from "./Tips";

export const Panel = observer(() => {
    const { game } = useStore();

    const pass = () => {
        if (game.seat !== game.banker) {
            tip.info("不该你出牌, 莫慌嘛");
            return;
        }
        if (game.seat === game.banker && game.recent === PASS) {
            tip.info("至少要出一张, 懂?");
            return;
        }
        api.discardCard(PASS);
        game.clearSelected();
    };

    const discard = () => {
        if (game.seat !== game.banker) {
            tip.info("不该你出牌, 莫慌嘛");
            return;
        }
        if (!game.selected.length) {
            tip.info("一张牌都没选, 想出?");
            return;
        }
        api.discardCard(game.selected.concat()).then((success) => {
            if (!success) {
                tip.info("没整对，重新出");
            }
        });
        game.clearSelected();
    };

    return (
        <PanelStyle>
            <div className="button" onClick={pass}>
                不要
            </div>
            <div className="button" onClick={discard}>
                出牌
            </div>
        </PanelStyle>
    );
});
