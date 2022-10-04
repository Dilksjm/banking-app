import {useMutation} from 'react-query';
import {login, logout} from '../../services/login-service';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {toastAtom} from '../../recoil/atoms/toast';
import {sessionIdAtom} from '../../recoil/atoms/session';

export function useLogin() {
    const setToast = useSetRecoilState(toastAtom);
    const setSessionId = useSetRecoilState(sessionIdAtom)

    return useMutation(login, {
        onSuccess: (response) => {
            setToast({show: true, message: 'Login Successful'})
            setSessionId(response.sessionId)
        },
        onError: (e) => {
            console.log(e)
            setToast({show: true, message: 'Login Failed', error:true})

        }
    })
}

export function useLogout() {
    const resetSessionId = useResetRecoilState(sessionIdAtom)
    const setToast = useSetRecoilState(toastAtom);

    return useMutation(logout, {
        onSuccess: () => {
            setToast({show: true, message: 'Logout Successful'})
            resetSessionId()
        },
        onError: (e) => {
            console.log(e)
            setToast({show: true, message: 'Logout Failed', error:true})
        }
    })
}
