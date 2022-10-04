import React from 'react';
import {useRecoilValue} from 'recoil';
import {sessionIdAtom} from '../recoil/atoms/session';
import {useGetAccount} from '../hooks/queries/account';

function Transactions() {
    const sessionId = useRecoilValue(sessionIdAtom);
    const {data: account} = useGetAccount(sessionId);
    const getTable = () => {
        if(account) {
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
                    {account.transactions.map(transaction => {
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
                    <label>{'Account Email: '}</label>
                    <div className={'d-inline ml-2'}>{account?.email}</div>
                </div>
                {getTable()}
            </div>
        </div>
    );
}

export default Transactions;
