import * as React from 'react';

import {useState} from 'react';


const Authorize =props=>{

    const   [login,setLogin]=useState(''),
            [password,setPassword]=useState(''),
            [name,setName]=useState(''),
            [checkPassword,setCheckPassword]=useState(''),
            [step,setStep] = useState('login');

    const authorize=()=>{
        fetch('http://localhost:5000/auth/',{
                method:'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    login,
                    password
                })
            }).then(res=>res.json()).then(res=>{
                    props.login(login,res.name,res.token);
                    setLogin('');
                    setPassword('');
            });
    };

    const registration = () => {
        fetch('http://localhost:5000/registration/',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
                    password,
                    name
                })
            }
        ).then(res => res.json()).then(res => {
            props.login(login, name, res.token);
            setLogin('');
            setPassword('');
        });
    };


    return(
        <div>
            <div>
                <div onClick={()=>setStep('login')}>Войти</div>
                <div onClick={()=>setStep('registration')}>Зарегистрироваться</div>
            </div>
            { step==='login'&&
                <div>
                    <label>
                        <span>Логин</span>
                        <input type={"text"} value={login} onChange={e=>setLogin(e.target.value)}/>
                    </label>
                    <label>
                        <span>Пароль</span>
                        <input type={"password"} value={password} onChange={e=>setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button disabled={!(login&&password)} onClick={authorize}>Войти</button>
                    </div>
                </div>
            }
            { step==="registration"&&
               <div>
                    <label>
                        <span>Логин</span>
                        <input type={"text"} value={login} onChange={e=>setLogin(e.target.value)}/>
                    </label>
                    <label>
                        <span>Имя</span>
                        <input type={"text"} value={name} onChange={e=>setName(e.target.value)}/>
                    </label>
                    <label>
                        <span>Пароль</span>
                        <input type={"password"} value={password} onChange={e=>setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <span>Повторите пароль</span>
                        <input type={"password"} value={checkPassword} onChange={e=>setCheckPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button disabled={!(name&&login&&password&&password===checkPassword)} onClick={registration}>Зарегистрироваться</button>
                    </div>
                </div>
            }
        </div>
    )
        
    
    
}

export default Authorize;