import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { UrlParam } from "../../utils/url";
import { LobbyBlue, LobbyStyle, LobbyWhite } from "../styles/lobby.css";
import { Create } from "./Create";
import { Join } from "./Join";

const enum LobbyUI {
    Init,
    Create,
    Join,
}

export const Lobby = observer(() => {
    const [mode, setMode] = useState<LobbyUI>(LobbyUI.Init);

    useEffect(() => {
        const roomId = UrlParam.roomId;
        if (roomId) setMode(LobbyUI.Join);
    }, []);

    return (
        <>
            {mode === LobbyUI.Init ? (
                <LobbyStyle theme={LobbyWhite}>
                    <div
                        className="button"
                        onClick={() => setMode(LobbyUI.Create)}
                    >
                        开房
                    </div>
                    <div
                        className="button"
                        onClick={() => setMode(LobbyUI.Join)}
                    >
                        加入
                    </div>
                </LobbyStyle>
            ) : (
                <LobbyStyle theme={LobbyBlue}>
                    {mode === LobbyUI.Create && <Create />}
                    {mode === LobbyUI.Join && <Join />}
                    <div
                        className="close"
                        onClick={() => setMode(LobbyUI.Init)}
                    >
                        X
                    </div>
                </LobbyStyle>
            )}
        </>
    );
});
