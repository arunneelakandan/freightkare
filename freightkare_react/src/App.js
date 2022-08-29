import './App.css';
import Login from './Authentication/login';
import Register from './Authentication/register';
import { useState } from 'react';
import { Space } from 'antd';
import Logo from './Static/images/fk_logo.svg';

function App() {

    // const [state,setState] = useState(false)


    return (
        <>
            <div className='row' style={{ margin: 0 }}>
                <div className='col-md-6'>
                    <div className='row' >
                    {/* <img id="headerTitle" src={Logo} align="middle" alt='FactEntry Logo'></img> */}
                    </div>
                </div>
                <div className='col-md-6' style={{ padding: 0 }}>
                    <Login />
                </div>
            </div>
            {/* <Register /> */}
            <div className="content flex">
                <p>Copyright © 2022 FrieghtKare</p>
            </div>
        </>
    );
}

export default App;
