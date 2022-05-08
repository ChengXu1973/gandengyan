import { observer } from "mobx-react";
import { useStore } from "../stores";
import { ScenesStyle } from "../styles/scenes.css";
import { Lobby } from "./Lobby";
import { Login } from "./Login";
import { Share } from "./Share";
import { Table } from "./Table";

export const Scenes = observer(() => {
    const { user, room, game } = useStore();

    const roomScene = game.gameStarted ? <Table /> : <Share />;

    const gameScene = room.inRoom ? roomScene : <Lobby />;

    return <ScenesStyle>{user.editing ? <Login /> : gameScene}</ScenesStyle>;
});
