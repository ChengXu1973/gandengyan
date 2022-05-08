import { observer } from "mobx-react";
import { useStore } from "../stores";
import { HandStyle } from "../styles/hand.css";
import { Card } from "./Card";

export const Hand = observer(() => {
    const { game } = useStore();

    return (
        <HandStyle>
            <div className="hand">
                {game.handcards.map((id, index) => (
                    <Card key={id.toFixed(0) + index} cardId={id} />
                ))}
            </div>
        </HandStyle>
    );
});
