import {useQuery} from 'react-query';
import {getAccount} from '../../services/account-service';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {toastAtom} from '../../recoil/atoms/toast';
import {sessionIdAtom} from '../../recoil/atoms/session';


export function useGetAccount(sessionId) {
    const setToast = useSetRecoilState(toastAtom);
    const resetSessionId = useResetRecoilState(sessionIdAtom)

    return useQuery(['session', sessionId], getAccount(sessionId), {
        onError: () => {
            setToast({show: true, message: 'Session has expired, you have been logged out', error:true})
            resetSessionId()
        }
    });
}
