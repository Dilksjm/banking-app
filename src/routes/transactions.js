import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {accountsAtom, selectedAccountIdAtom} from '../recoil/atoms/accounts';
import Dropdown from '../components/dropdown';
import {selectedAccountSelector} from '../recoil/selectors/accounts';

function Transactions() {
    const accounts = useRecoilValue(accountsAtom);
    const [selectedAccountId, setSelectedAccountId] = useRecoilState(selectedAccountIdAtom);
    const selectedAccount = useRecoilValue(selectedAccountSelector)
    const getTable = () => {
        if(selectedAccount) {
            return (
                <table className="table table-striped table-bordered my-4">
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedAccount.transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )

        }
    }

    return (
        <div className={'card-body'}>
            <div className={'mx-auto w-25 d-flex flex-column justify-content-center'}>
                <h5 className="card-title text-center">{'Transactions'}</h5>
                <div className={'d-sm-flex mx-auto'}>
                    <Dropdown
                        defaultMessage={'Select An Account'}
                        items={Object.values(accounts).map(account => ({id: account.id, text: account.name}))}
                        noItemsMessage={'No accounts available'}
                        onChange={setSelectedAccountId}
                        selectedId={selectedAccountId}
                    />
                </div>
                {getTable()}
            </div>
        </div>
    );
}

export default Transactions;
