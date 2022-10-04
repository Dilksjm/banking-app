import React from 'react';
import {useRecoilValue} from 'recoil';
import {sessionIdAtom} from '../recoil/atoms/session';
import Logout from '../components/logout';
import Login from '../components/login';
import CreateAccount from '../components/create-account';
import {useGetAccount} from '../hooks/queries/account';

function Account() {
    const sessionId = useRecoilValue(sessionIdAtom);
    const {data: account} = useGetAccount(sessionId)

    if(account) {
        return (<Logout/>)
    }
    return (
        <>
            <Login/>
            <hr/>
            <CreateAccount/>
        </>
    );
}

export default Account;
