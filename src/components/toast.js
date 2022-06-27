import React, {useEffect} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {toastAtom} from '../recoil/atoms/toast';
import {useLocation} from 'react-router-dom';

function Toast() {
    const toast = useRecoilValue(toastAtom);
    const resetToast = useResetRecoilState(toastAtom);
    const currentRoute = useLocation();

    useEffect(() => {
        resetToast()
    }, [currentRoute.pathname])

    if(toast.show) {
        return (

            <div style={{position: 'absolute', top:0, left:'50%', backgroundColor: 'green', width: '220px', marginLeft: '-110px', color: 'white', borderRadius:'4px', padding:'16px'}}>
                <div className={'ml-2 d-inline text-center'}>
                    {toast.message}
                </div>
                <button type="button" className="mb-1 close" aria-label="Close" onClick={resetToast}>
                        <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
}

export default Toast;
