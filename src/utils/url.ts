import { UrlParamKey } from "../consts";

const urlParam = new URLSearchParams(location.search);
const roomId = urlParam.get(UrlParamKey.Room) ?? "";

export const UrlParam = { roomId };
