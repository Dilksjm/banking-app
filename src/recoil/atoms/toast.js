// Unpublished Work © 2022 Deere & Company

import {atom} from 'recoil';

export const toastAtom = atom({
    key: 'toast',
    default: {
        show: false,
        message: null
    }
});
