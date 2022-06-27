import React, {useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {accountsAtom, selectedAccountIdAtom} from '../recoil/atoms/accounts';
import {toastAtom} from '../recoil/atoms/toast';
import Dropdown from '../components/dropdown';
import {selectedAccountSelector} from '../recoil/selectors/accounts';

function Withdraw() {
    const [accounts, setAccounts] = useRecoilState(accountsAtom);
    const [selectedAccountId, setSelectedAccountId] = useRecoilState(selectedAccountIdAtom);
    const selectedAccount = useRecoilValue(selectedAccountSelector)
    const [amount, setAmount] = useState(undefined);
    const setToast = useSetRecoilState(toastAtom);

    const onWithdraw = () => {
        setAccounts({
            ...accounts,
            [selectedAccountId]: {
                ...selectedAccount,
                balance: selectedAccount.balance - amount,
                transactions: [...selectedAccount.transactions, {
                    type: 'WITHDRAW',
                    amount,
                    date: new Date().toLocaleDateString()
                }]
            }
        })
        setToast({show: true, message: 'Withdraw Successful'});
    }
    const onChange = (event) => {
        if(Number(event.target.value > selectedAccount.balance)) {
            setAmount(selectedAccount.balance);
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
                    <Dropdown
                        defaultMessage={'Select An Account'}
                        items={Object.values(accounts).map(account => ({id: account.id, text: account.name}))}
                        noItemsMessage={'No accounts available'}
                        onChange={setSelectedAccountId}
                        selectedId={selectedAccountId}
                    />
                </div>
                <div className="form-group">
                    <label>{'Current Balance: '}</label>
                    <div className={'d-inline ml-2'}>{selectedAccountId ? selectedAccount.balance : 0}</div>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" id="amount" placeholder="Amount" required disabled={!selectedAccount} onChange={onChange} min={0} step={20} value={amount} max={selectedAccountId ? selectedAccount.balance : 0}/>
                </div>
                <button type="button" disabled={!Boolean(amount)} className="btn btn-primary" onClick={onWithdraw}>{'Withdraw'}</button>
            </form>
        </div>
    );
}

export default Withdraw;
