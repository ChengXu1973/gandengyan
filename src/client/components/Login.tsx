import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { NICK_LENTH } from "../../consts";
import { useStore } from "../stores";
import { LoginStyle } from "../styles/login.css";
import { tip } from "./Tips";

export const Login = observer(() => {
    const { user } = useStore();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current!.value = user.nickName ?? "";
    }, []);

    const onEdit = () => {
        const name = inputRef.current?.value ?? "";
        if (!name) {
            tip.info("取个名字先!");
            return;
        }
        if (name.length > NICK_LENTH) {
            tip.info(`${NICK_LENTH}个字就够了嘛`);
            return;
        }
        user.editNickName(name);
    };

    return (
        <LoginStyle>
            <input type="text" placeholder="昵称" ref={inputRef} />
            <div onClick={onEdit}>是我</div>
        </LoginStyle>
    );
});
