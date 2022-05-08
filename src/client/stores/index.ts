import { createContext, useContext } from "react";
import { game } from "./game-store";
import { room } from "./room-store";
import { user } from "./user-store";

const stores = { user, game, room };
const context = createContext(stores);
const useStore = () => useContext(context);

export { stores, useStore };
