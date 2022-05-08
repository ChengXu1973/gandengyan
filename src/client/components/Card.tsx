import { observer } from "mobx-react";
import { Cards } from "../../utils/cards";
import { useStore } from "../stores";
import { CardStyle } from "../styles/card.css";

export const Card = observer((props: { cardId: number }) => {
    const { game } = useStore();
    const { cardId } = props;
    const suit = Cards.GetCardSuitById(cardId);
    const point = Cards.GetCardPointById(cardId);

    const pointStr = [
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
        "2",
        "JOKER",
        "JOKER",
    ][point];
    const suitStr = ["👻", "♥️", "♠️", "♦️", "♣️"][suit];

    return (
        <CardStyle
            selected={game.selected.indexOf(cardId) > -1}
            onClick={() => game.selectCard(cardId)}
        >
            <div className={`suit${suit}`}>
                <div className={`point point${point}`}>{pointStr}</div>
                <div className="suit">{suitStr}</div>
            </div>
        </CardStyle>
    );
});
