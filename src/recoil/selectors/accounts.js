import {selector} from 'recoil';
import {accountsAtom, selectedAccountIdAtom} from '../atoms/accounts';

export const selectedAccountSelector = selector({
    key: 'FilteredTodoList',
    get: ({get}) => {
        const accounts = get(accountsAtom);
        const selectedAccountId = get(selectedAccountIdAtom);

        return accounts[selectedAccountId]
    },
});
