import React, { useState, useEffect, createContext } from "react";
import { Menu, Button, Result } from 'antd';
import { AppstoreOutlined, PieChartOutlined, ProjectOutlined, ExportOutlined,WifiOutlined, LineChartOutlined, HddOutlined, TeamOutlined, HomeOutlined, RiseOutlined, DashboardOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import Logo from '../Static/images/fk_logo.svg';
import background from '../Static/background.jpg'

export const ParentfromHomeContext = createContext()

function Home() {
    const [UserAuth, setUserAuth] = useState('NEITHER');
    const [isLoaded, setIsLoaded] = useState(
        {
            UserAuth: 'NEITHER',
            masterDict: false
        }
    );
    const [CurrentApp, setCurrentApp] = useState('FreightKare')
    const [masterDict, setMasterdict] = useState()
    useEffect(() => {
        fetch(`api/accounts/authenticated`)
            .then(res => res.json())
            .then((result) => {
                if (result.is_authenticated === true) {
                    setUserAuth(result);
                    setIsLoaded(value => ({ ...value, UserAuth: true }));
                    setTimeout(() => {
                        setMasterdict(result)
                        setIsLoaded(value => ({ ...value, masterDict: true }))
                    }, 4000)
                    setTimeout(() => {
                        setloadingStyle({
                            opacity: 0,
                            transition: "all 1s ease-in"
                        })
                    }, 4000)
                }
                else {
                    setIsLoaded(value => ({ ...value, UserAuth: false }))
                }


            },
            )

    }, [CurrentApp])



    const { SubMenu } = Menu;

    const Logout = async function loginRequest(data) {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        const response = await fetch(`api/accounts/logout`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        });
        const data_1 = await response.json();
        window.location.href = '/'
        return data_1;
    }

    const handleClick = e => {
        if (e.key === '1') {
            Logout()
        }


    }



    const [loadingStyle, setloadingStyle] = useState({})

    if (isLoaded.UserAuth === true) {

        if (isLoaded.masterDict === false) {
            return (
                <div className="preloader" style={loadingStyle}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={Logo} alt='FactEntry Logo' style={{ paddingBottom: '10px' }} />
                        <div className="sk-spinner sk-spinner-wave">
                            <div className="sk-rect1"></div>&nbsp;
                            <div className="sk-rect2"></div>&nbsp;
                            <div className="sk-rect3"></div>&nbsp;
                            <div className="sk-rect4"></div>&nbsp;
                            <div className="sk-rect5"></div>
                        </div>
                        <p style={{ fontSize: 'x-large', color: "white" }}>Hi {UserAuth.first_name}, Welcome to FreightKare</p>
                    </div>
                </div>
            )
        }
        else {
           
                return (
                    <>

                        <div >
                            <ParentfromHomeContext.Provider value={{ UserAuth, CurrentApp, setCurrentApp }}>
                                <div>
                                <Menu
                                    onClick={handleClick}
                                    style={{ width: 256, height: 850 }}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="0" icon={<HomeOutlined />}>Home</Menu.Item>
                                    <Menu.Item key="1" icon={<ExportOutlined />}>Logout</Menu.Item>
                                </Menu>
                                </div>

                            </ParentfromHomeContext.Provider>
                        </div>
                    </>
                )
            
        }
    }
    else if (isLoaded.UserAuth === false) {
        return (
            <div style={{ height: '100%', background: '#f5f5f5' }}>
                <Result
                    status="403"
                    title="You are breaching FreightKare security!"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button size="small" type="ghost" onClick={() => { window.location.href = '/' }}>
                        Login
                    </Button>}
                />
            </div>
        )

    }
    else {
        return (<></>)
    }
}

export default Home