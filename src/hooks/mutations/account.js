import {useMutation, useQueryClient} from 'react-query';
import {createAccount, postTransaction} from '../../services/account-service';
import {useSetRecoilState} from 'recoil';
import {toastAtom} from '../../recoil/atoms/toast';

export function useCreateAccount() {
    const setToast = useSetRecoilState(toastAtom);

    return useMutation(createAccount, {
        onSuccess: () => {
            setToast({show: true, message: 'Account Created. Please Login.'})
        },
        onError: () => {
            setToast({show: true, message: 'Account Create Failed', error:true})
        }
    })
}

export function usePostTransaction(email) {
    const setToast = useSetRecoilState(toastAtom);
    const queryClient = useQueryClient();

    return useMutation(postTransaction(email), {
        onSuccess: () => {
            setToast({show: true, message: 'Transaction Complete'})
            queryClient.invalidateQueries(['session'])
        },
        onError: () => {
            setToast({show: true, message: 'Transaction Failed', error:true})
        }
    })
}
