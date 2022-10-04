import React, {useState} from 'react';
import {useLogin} from '../hooks/mutations/login';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const idSetterMap = {
        email: setEmail,
        password: setPassword
    }
    const loginMutation = useLogin();

    const onChange = (input) => {
        idSetterMap[input.target.id](input.target.value);
    }

    const login = () => {
        loginMutation.mutate({email, password})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        login()
        for (const id in idSetterMap) {
            idSetterMap[id]('')
        }
    }


    return (
        <div className={'card-body'}>
            <h5 className="card-title text-center">{'Login'}</h5>
            <form className={'w-25 mx-auto'} onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="emailInput">{'Email address'}</label>
                    <input type="email" className="form-control" id="email" value={email} placeholder="Enter email" onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">{'Password'}</label>
                    <input type="password" className={'form-control'} id="password" value={password} placeholder="Enter Password" required onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">{'Login'}</button>
            </form>
        </div>
    );
}

export default Login;
