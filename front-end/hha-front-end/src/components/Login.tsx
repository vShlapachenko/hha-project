import React, {FC, useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite"

const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    return (
        <div>
            <Post image={"https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg"}
            heading={}
            patient_name={}
            patient_age={}
            patient_location={}
            reason_hcbh={}
            duration_hcbh={}
            diagnosisyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
            
            
            
            
            
            />
            {/* <h1>Login page</h1>
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
            </button> */}
        </div>

    );
};

export default observer(Login);




