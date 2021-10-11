import React, {FC, useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite"


const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    return (
        <div>
            <h1>Login page</h1>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />

            <button onClick={() => store.login(email, password)}>
                Login
            </button>

            <a href={"./forgotPassword"}>Forgot your password?</a>
        </div>
    );
};

export default observer(Login);




