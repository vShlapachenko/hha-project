import React, {FC, useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite"
import Post from './case_studies/case_study'
import UP from './user_profile/userProfile'

const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    return (
        <div>
            {/* <Post image={"data:image/jpeg;base64,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"}
            header={'cancer patient'}
            patient_name={'Mukesh'}
            patient_age={'69'}
            patient_location={'PVR'}
            visiting_reason={'chutiyaapa'}
            duration={'15 days'}
            diagnosis = {'cancer'}
            story = {'My first appointment at CTCA was on September 22, 2016. At my initial evaluation, I underwent further testing with a team of doctors and clinicians to better understand my cancer and my treatment options. I met with the Assistant Director of the Stem Cell Transplant and Cell Therapy Program at CTCA Chicago. I felt so comfortable at CTCA. I liked the atmosphere, and the doctors are so informative, yet personable. I was surrounded by other cancer patients going through the same journey I was. I felt like I had an entire support team there.'}
            breif = {'Patient cured in record time with your help'}
            caseImage = {'https://upload.wikimedia.org/wikipedia/commons/6/69/Mukesh_Ambani.jpg'}
            /> */}

            <UP 
            firstName={"JYOTIR"}
            lastName={"MAYOR"} 
            email={"JMAYOR@HHA.CA"}
            staffNumber={"69"}
            
            />

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
        </div>

    );
};

export default observer(Login);




