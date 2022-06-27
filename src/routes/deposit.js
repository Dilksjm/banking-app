import React, {useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {accountsAtom, selectedAccountIdAtom} from '../recoil/atoms/accounts';
import Dropdown from '../components/dropdown';
import {toastAtom} from '../recoil/atoms/toast';
import {selectedAccountSelector} from '../recoil/selectors/accounts';

function Deposit() {
    const [accounts, setAccounts] = useRecoilState(accountsAtom);
    const [selectedAccountId, setSelectedAccountId] = useRecoilState(selectedAccountIdAtom);
    const selectedAccount = useRecoilValue(selectedAccountSelector)
    const [amount, setAmount] = useState(undefined);
    const setToast = useSetRecoilState(toastAtom);

    const onDeposit = () => {
        setAccounts({
            ...accounts,
            [selectedAccountId]: {
                ...selectedAccount,
                balance: selectedAccount.balance + amount,
                transactions: [...selectedAccount.transactions, {
                    type: 'DEPOSIT',
                    amount,
                    date: new Date().toLocaleDateString()
                }]
            }
        })
        setToast({show: true, message: 'Deposit Successful'});
    }
    const onChange = (event) => {
        if(Number(event.target.value < 0)) {
            setAmount(0);
        }
        else {
            setAmount(Number(event.target.value))
        }
    }

    return (
        <div className={'card-body'}>
            <h5 className="card-title text-center">{'Deposit'}</h5>
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
                    <input type="number" className="form-control" id="amount" placeholder="Amount" required disabled={!selectedAccount} onChange={onChange} min={0} step={20} value={amount}/>
                </div>
                <button type="button" disabled={!Boolean(amount)} className="btn btn-primary" onClick={onDeposit}>{'Deposit'}</button>
            </form>
        </div>
    );
}

export default Deposit;
