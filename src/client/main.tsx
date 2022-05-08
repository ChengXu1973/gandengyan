import { Provider } from "mobx-react";
import { ReactElement } from "react";
import ReactDOM from "react-dom";
import { Scenes } from "./components/Scenes";
import { stores } from "./stores";

const App = (): ReactElement => {
    return (
        <Provider {...stores}>
            <Scenes />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
