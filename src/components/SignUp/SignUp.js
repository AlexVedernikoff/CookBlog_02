import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { setUser, errorFail, errorNull } from '../../store/userSlice';

import FormSignUp from './FormSignUp';

function SignUp() {
    const useStateUser = () => {
        const stateUserst = useSelector((state) => state.user);
        return stateUserst;
    };
    const dispath = useDispatch();
    const { error,  userData} = useStateUser();

    
    const userRegistration = (val) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, val.email.trim(), val.password.trim())
            .then(({user}) => {
                dispath(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
            })
            .catch(() => {
                dispath(errorFail());
            });
    };

    const onCloseMessage = () => {
        dispath(errorNull());
    };

    const errorAlert = error && <Alert description= "Something has gone wrong" type="error" showIcon closable onClose={() => onCloseMessage()} />;
    const successAlert = userData && <SuccessMessage description="Registration was successful!" closable={false}  />;
    const signUpForm = !successAlert && <FormSignUp userRegistration={userRegistration} />;
    return (
        <>
            {errorAlert}
            {successAlert}
            {signUpForm}
        </>
    );
};

export default SignUp;