import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {toastAtom} from '../recoil/atoms/toast';
import {accountsAtom} from '../recoil/atoms/accounts';
import { v4 as uuidv4 } from 'uuid';

function Account() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccountBeenCreated, setHasAccountBeenCreated] = useState(false);
    const idSetterMap = {
        name: setName,
        email: setEmail,
        password: setPassword
    }
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const setToast = useSetRecoilState(toastAtom);
    const setAccounts = useSetRecoilState(accountsAtom);


    const onChange = (input) => {
        idSetterMap[input.target.id](input.target.value);
    }

    const createAccount = () => {
        const id = uuidv4();
        setAccounts((current) => ({
            ...current,
            [id]: {
                name,
                email,
                password,
                id,
                balance: 0,
                transactions: []
            }
        }))
        setHasAccountBeenCreated(true);
        setToast({show: true, message: 'Account Created'});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!passwordInvalid) {
            createAccount();
            for (const id in idSetterMap) {
                idSetterMap[id]('')
            }
        }
    }

    const passwordOnBlur = () => {
        if(password.length < 8) {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }
    }

    return (
        <div className={'card-body'}>
            <h5 className="card-title text-center">{'Create An Account'}</h5>
            <form className={'w-25 mx-auto'} onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">{'Name'}</label>
                    <input type="text" className="form-control" id="name" value={name} placeholder="Enter name" onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">{'Email address'}</label>
                    <input type="email" className="form-control" id="email" value={email} placeholder="Enter email" onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">{'Password'}</label>
                    <input type="password" className={passwordInvalid ? 'form-control is-invalid' : 'form-control'} id="password" value={password} placeholder="Enter Password" required onChange={onChange} onBlur={passwordOnBlur}/>
                    {passwordInvalid && <small id="passwordHelp" className="form-text text-muted">{'Password must be atleast 8 characters long.'}</small>}
                </div>
                <button type="submit" className="btn btn-primary">{!hasAccountBeenCreated ? 'Create Account' : 'Add Another Account'}</button>
            </form>
        </div>
    );
}

export default Account;
