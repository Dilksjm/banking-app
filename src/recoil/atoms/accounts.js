// Unpublished Work © 2022 Deere & Company

import {atom} from 'recoil';

export const accountsAtom = atom({
    key: 'accounts',
    default: {}
});

export const selectedAccountIdAtom = atom({
    key: 'selectedAccountId',
    default: null
});


