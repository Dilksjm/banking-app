import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {sessionIdAtom} from '../recoil/atoms/session';
import {useGetAccount} from '../hooks/queries/account';
import {usePostTransaction} from '../hooks/mutations/account';
import {WITHDRAW} from '../constants';


function Withdraw() {
    const sessionId = useRecoilValue(sessionIdAtom);
    const {data: account} = useGetAccount(sessionId);
    const [amount, setAmount] = useState(undefined);
    const postTransactionMutation = usePostTransaction(account?.email);


    const onWithdraw = () => {
        postTransactionMutation.mutate({amount, type: WITHDRAW})
    }
    const onChange = (event) => {
        if(Number(event.target.value > account.balance)) {
            setAmount(account.balance);
        }
        else {
            setAmount(Number(event.target.value))
        }
    }

    return (
        <div className={'card-body'}>
            <h5 className="card-title text-center">{'Withdraw'}</h5>
            <form className={'w-25 mx-auto'}>
                <div className="form-group">
                    <label>{'Account Email: '}</label>
                    <div className={'d-inline ml-2'}>{account?.email}</div>
                </div>
                <div className="form-group">
                    <label>{'Current Balance: '}</label>
                    <div className={'d-inline ml-2'}>{account ? account.balance : 0}</div>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" id="amount" placeholder="Amount" required disabled={!account} onChange={onChange} min={0} step={20} value={amount} max={account ? account.balance : 0}/>
                </div>
                <button type="button" disabled={!Boolean(amount)} className="btn btn-primary" onClick={onWithdraw}>{'Withdraw'}</button>
            </form>
        </div>
    );
}

export default Withdraw;
