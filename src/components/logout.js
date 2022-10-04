import React from 'react';
import {useRecoilValue} from 'recoil';
import {sessionIdAtom} from '../recoil/atoms/session';
import {useLogout} from '../hooks/mutations/login';

function Logout() {
    const sessionId = useRecoilValue(sessionIdAtom)
    const logoutMutation = useLogout();


    const logout = () => {
        logoutMutation.mutate({sessionId})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        logout()
    }

    return (
        <div className={'card-body'}>
            <h5 className="card-title text-center">{'Logout'}</h5>
            <form className={'w-25 mx-auto'} onSubmit={onSubmit}>
                <button type="submit" className="btn btn-primary">{'Logout'}</button>
            </form>
        </div>
    );
}

export default Logout;
