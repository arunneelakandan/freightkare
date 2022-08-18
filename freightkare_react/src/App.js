import logo from './logo.svg';
import './App.css';
import Login from './Authentication/login';
import Register from './Authentication/register';
import { useState } from 'react';


function App() {

    // const [state,setState] = useState(false)


    return (
        <>
        
        <div style={{ position: 'absolute', width: '100%'}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '30%',
                flexDirection: 'column',
                margin: 'auto',
                marginTop: '150px',
                boxShadow: '0px 0px 20px 13px #f7f7f7',
                background: 'azure',
                borderRadius: '20px'
            }}>
                <h1>FreightKare</h1>
                <Login />
                {/* <Register /> */}
            </div >
        </div >
        </>
    );
}

export default App;
