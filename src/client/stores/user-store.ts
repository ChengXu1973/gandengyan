import { action, makeObservable, observable } from "mobx";
import { StorageKey } from "../../consts";

class UserStore {
    public constructor() {
        makeObservable(this);
    }

    @observable
    public nickName: string = localStorage.getItem(StorageKey.NickName) ?? "";

    @observable
    public editing: boolean = true;

    @action
    public showEdit() {
        this.editing = true;
    }

    @action
    public editNickName(name: string) {
        localStorage.setItem(StorageKey.NickName, name);
        this.nickName = name ?? "Unknown";
        this.editing = false;
    }
}

export const user = new UserStore();
