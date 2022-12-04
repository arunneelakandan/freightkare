import React, { useState, useEffect, createContext } from "react";
import { Menu, Button, Result, AutoComplete, Input } from 'antd';
import { AppstoreOutlined, PieChartOutlined, ProjectOutlined, ExportOutlined, WifiOutlined, LineChartOutlined, HddOutlined, TeamOutlined, HomeOutlined, RiseOutlined, DashboardOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import Logo from '../Static/images/fk_logo.svg';
import background from '../Static/background.jpg'
import '../Static/fk_resources/css/_404.scss';
import '../Static/fk_resources/css/_about.scss';
import '../Static/fk_resources/css/_booking.scss';
import '../Static/fk_resources/css/_contact.scss';
import '../Static/fk_resources/css/_global.scss';
import '../Static/fk_resources/css/_home.scss';
import '../Static/fk_resources/css/_login.scss';
import '../Static/fk_resources/css/_quote.scss';
import '../Static/fk_resources/css/_responsive.scss';
import '../Static/fk_resources/css/_shell.scss';
import '../Static/fk_resources/css/_utils.scss';
import '../Static/fk_resources/css/_variables.scss';
import '../Static/fk_resources/css/style.css';
import '../Static/fk_resources/css/style.scss';
import Cookies from 'js-cookie';

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

    const [options, setOptions] = useState([]);
    const handleSearch = (value, field) => {
        console.log(value, field)
        if (value.length > 2) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
            myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");


            const raw = JSON.stringify({
                "port_name": value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const searchResultfun = (query) =>
                query.map((item) => {
                    return {
                        id: item.entityid,
                        value: item.entityname,
                        country: item.Country,
                        sector: item.sectorfactEntry,
                        label: (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>
                                    {item.entityname} | <b>{item.jurisdiction}</b>
                                </span>
                            </div>
                        ),
                    };
                });



            fetch(`/api/commons/port_name_suggestion`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result)
                    if (result.is_authenticated === true) {

                        setOptions(value ? searchResultfun(result.data) : [])

                    }


                })
                .catch(error => console.log('error', error));
        }
    };
    const onSelect = (value) => {
        console.log('onSelect', value);
    };


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
                            <div className="container-fluid container-shell">
                                <div className="row">

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 shell-main">
                                        <div className="shell-inner">
                                            <div className="shell-header">
                                                <div className="logo-wrap">
                                                    <a href="./index.html">
                                                        <img src="./assets/images/svg/fk_logo.svg" alt="logo" />
                                                    </a>
                                                </div>
                                                <ul className="nav-menu">
                                                    <li className="nav-menuList">
                                                        <a href="./index.html">
                                                            <span>Home</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-menuList">
                                                        <a href="./quote.html">
                                                            <span>Quote</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-menuList nav-menuList-active">
                                                        <a href="./booking.html">
                                                            <span>Booking</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-menuList">
                                                        <a href="./aboutus.html">
                                                            <span>About us</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-menuList">
                                                        <a href="./contact.html">
                                                            <span>Contact</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-menuList">
                                                        <a href="./login.html">
                                                            <span>Sign In</span>
                                                        </a>
                                                    </li>

                                                </ul>

                                                <div className="mob-menu-icon">
                                                    <div className="menu-icon"></div>
                                                </div>

                                            </div>
                                            <div className="shell-body">
                                                <div className="fk-booking-wrap">
                                                    <div className="fk-booking-form-wrap">
                                                        <h1>Create a booking</h1>
                                                        <h3>Type of booking</h3>

                                                        <div className="fk-booking-tabs">
                                                            <ul className="nav nav-tabs" id="fk-booking-tablist" role="tablist">
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link active" id="fcl-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#fcl" type="button" role="tab"
                                                                        aria-controls="fcl-tab" aria-selected="true">
                                                                        <i className="fas fa-truck-moving"></i>
                                                                        FCL
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link" id="lcl-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#lcl" type="button" role="tab"
                                                                        aria-controls="lcl-tab" aria-selected="false">
                                                                        <i className="fas fa-box-open"></i>
                                                                        LCL
                                                                    </button>
                                                                </li>
                                                                <li className="nav-item" role="presentation">
                                                                    <button className="nav-link" id="air-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#air" type="button" role="tab"
                                                                        aria-controls="air-tab" aria-selected="false">
                                                                        <i className="fas fa-fighter-jet"></i>
                                                                        Air
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content fk-booking-content" id="fk-booking-content">


                                                                <form id="fcl" role="tabpanel" aria-labelledby="fcl-tab" action="/" className="fk-booking-form fk-fcl-form tab-pane fade show active">
                                                                    <div className="fk-booking-detail fk-origin">
                                                                        <h4>Origin</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door pickup by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="fk-booking-choice-info">
                                                                                    <p>Local charges included.</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Origin Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Origin Port / City</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <AutoComplete
                                                                                        dropdownMatchSelectWidth={252}
                                                                                        style={{
                                                                                            width: 300,
                                                                                        }}
                                                                                        options={options}
                                                                                        onSelect={onSelect}
                                                                                        onSearch={handleSearch}
                                                                                    >
                                                                                        <Input.Search size="large" placeholder="input here" enterButton />
                                                                                    </AutoComplete>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Cargo Ready Date</h3>
                                                                                <div
                                                                                    className="material-textfield material-textfield-calender">
                                                                                    <input className="datepicker" placeholder=" "
                                                                                        type="text" />
                                                                                    <label>Date</label>
                                                                                    <img className="calender-icon"
                                                                                        src="./assets/images/svg/calender.svg"
                                                                                        alt="calender_icon" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="fk-booking-detail fk-destination">
                                                                        <h4>Destination</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door delivery by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Destination Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Destination Port / City</h3>
                                                                                <div className="form-field single-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Destination Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="fk-booking-detail fk-cargo">
                                                                        <h4>Cargo</h4>
                                                                        <div className="fk-cargo-choice dang_cargo_wrap">
                                                                            <div className="form-radio">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_type_fcl"
                                                                                        id="cargo_type_fcl_0_0"
                                                                                        value="non-danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_fcl_0_0">
                                                                                        Non-Dangerous
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input dang_cargo" type="radio"
                                                                                        name="cargo_type_fcl"
                                                                                        id="cargo_type_fcl_1_0"
                                                                                        value="danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_fcl_1_0">
                                                                                        Dangerous
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-field file-input cargo-doc">
                                                                            <input
                                                                                type="file"
                                                                                name="file-input"
                                                                                id="file-input"
                                                                                className="file-input__input"
                                                                                multiple
                                                                                accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                            />
                                                                            <label className="file-input__label" for="file-input">
                                                                                <svg
                                                                                    aria-hidden="true"
                                                                                    focusable="false"
                                                                                    data-prefix="fas"
                                                                                    data-icon="upload"
                                                                                    className="svg-inline--fa fa-upload fa-w-16"
                                                                                    role="img"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 512 512"
                                                                                >
                                                                                    <path
                                                                                        fill="currentColor"
                                                                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                                    ></path>
                                                                                </svg>
                                                                                <span>Upload MSDS</span></label
                                                                            >
                                                                        </div>

                                                                        <div className="cargo-container-type">
                                                                            <h2>Container Type</h2>
                                                                            <ul className="nav nav-tabs" id="fk-booking-tablist" role="tablist">
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link active" id="gc-tab" data-bs-toggle="tab"
                                                                                        data-bs-target="#type_gc" type="button" role="tab"
                                                                                        aria-controls="gc-tab" aria-selected="true">
                                                                                        GC
                                                                                    </button>
                                                                                </li>
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link" id="ot-tab" data-bs-toggle="tab"
                                                                                        data-bs-target="#type_ot" type="button" role="tab"
                                                                                        aria-controls="ot-tab" aria-selected="false">
                                                                                        OT
                                                                                    </button>
                                                                                </li>
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link" id="reef-tab" data-bs-toggle="tab"
                                                                                        data-bs-target="#type_reef" type="button" role="tab"
                                                                                        aria-controls="reef-tab" aria-selected="false">
                                                                                        REEF
                                                                                    </button>
                                                                                </li>
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link" id="fr-tab" data-bs-toggle="tab"
                                                                                        data-bs-target="#type_fr" type="button" role="tab"
                                                                                        aria-controls="fr-tab" aria-selected="false">
                                                                                        FR
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="tab-content cargo-type-content">
                                                                                <div id="type_gc" role="tabpanel" aria-labelledby="gc-tab" action="/"
                                                                                    className="fk-containerType fk-gc tab-pane fade show active">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice">
                                                                                            <h5>Size</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_gc_size"
                                                                                                        id="cargo_gc_size_0_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_gc_size_0_0">
                                                                                                        20"
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_gc_size"
                                                                                                        id="cargo_gc_size_1_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_gc_size_1_0">
                                                                                                        40"
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_gc_size"
                                                                                                        id="cargo_gc_size_2_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_gc_size_2_0">
                                                                                                        20" HC
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_gc_size"
                                                                                                        id="cargo_gc_size_3_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_gc_size_3_0">
                                                                                                        40" HC
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-total-cargo">
                                                                                            <div className="form-field-multi fk-cargo-count">
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Count</h3>
                                                                                                    <div className="quantity-field">
                                                                                                        <img className="sub"
                                                                                                            src="./assets/images/svg/sub.svg"
                                                                                                            alt="sub" />
                                                                                                        <input type="number" value="0" />
                                                                                                        <img className="add"
                                                                                                            src="./assets/images/svg/add.svg"
                                                                                                            alt="add" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Weight (mt)</h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" " min="1"
                                                                                                            className="form-control" />
                                                                                                        <label>Enter weight</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <button type="button" className="btn btn-default btn-cargo">ADD</button>
                                                                                </div>
                                                                                <div id="type_ot" role="tabpanel" aria-labelledby="ot-tab" action="/"
                                                                                    className="fk-containerType fk-ot tab-pane fade">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice">
                                                                                            <h5>Size</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_ot_size"
                                                                                                        id="cargo_ot_size_0_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_ot_size_0_0">
                                                                                                        20"
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_ot_size"
                                                                                                        id="cargo_ot_size_1_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_ot_size_1_0">
                                                                                                        40"
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice dimension_wrap">
                                                                                            <h5>Dimensions in</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_ot_dimension"
                                                                                                        id="cargo_ot_dimension_0_0"
                                                                                                        value="m"
                                                                                                        checked />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_ot_dimension_0_0">
                                                                                                        M
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_ot_dimension"
                                                                                                        id="cargo_ot_dimension_1_0"
                                                                                                        value="cm" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_ot_dimension_1_0">
                                                                                                        CM
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_ot_dimension"
                                                                                                        id="cargo_ot_dimension_2_0"
                                                                                                        value="in" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_ot_dimension_2_0">
                                                                                                        IN
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                        <div className="fk-cargo-container-wrap fk-detail-container">
                                                                                            <div className="fk-cargo-container fk-clone">
                                                                                                <div className="form-field-wrap fk-product-scale">
                                                                                                    <h3 className="title">Length <span>(m)</span></h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" "
                                                                                                            className="form-control" />
                                                                                                        <label>Length</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap fk-product-scale">
                                                                                                    <h3 className="title">Width <span>(m)</span></h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" "
                                                                                                            className="form-control" />
                                                                                                        <label>Width</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap fk-product-scale">
                                                                                                    <h3 className="title">Height <span>(m)</span></h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" "
                                                                                                            className="form-control" />
                                                                                                        <label>Height</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Weight <span>(kg)</span></h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" "
                                                                                                            className="form-control" />
                                                                                                        <label>Weight</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="delete-clone">
                                                                                                    <i className="far fa-trash-alt"></i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="fk-cargo-container-btn">
                                                                                            <button type="button" className="btn btn-default btn-cargo btn-clone">Add Container</button>
                                                                                            <button type="button" className="btn btn-default btn-cargo">Add</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="type_reef" role="tabpanel" aria-labelledby="reef-tab" action="/"
                                                                                    className="fk-containerType fk-reef tab-pane fade">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice">
                                                                                            <h5>Size</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_reef_size"
                                                                                                        id="cargo_reef_size_0_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_reef_size_0_0">
                                                                                                        20"
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_reef_size"
                                                                                                        id="cargo_reef_size_1_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_reef_size_1_0">
                                                                                                        40"
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-total-cargo">
                                                                                            <div className="form-field-multi fk-cargo-count">
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Count</h3>
                                                                                                    <div className="quantity-field">
                                                                                                        <img className="sub"
                                                                                                            src="./assets/images/svg/sub.svg"
                                                                                                            alt="sub" />
                                                                                                        <input type="number" value="0" />
                                                                                                        <img className="add"
                                                                                                            src="./assets/images/svg/add.svg"
                                                                                                            alt="add" />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Weight (mt)</h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" " min="1"
                                                                                                            className="form-control" />
                                                                                                        <label>Enter weight</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Temp (<sup>o</sup>c)</h3>
                                                                                                    <div className="form-field material-textfield">
                                                                                                        <input type="number" placeholder=" " min="1"
                                                                                                            className="form-control" />
                                                                                                        <label>Temp</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <button type="button" className="btn btn-default btn-cargo">ADD</button>
                                                                                </div>
                                                                                <div id="type_fr" role="tabpanel" aria-labelledby="fr-tab" action="/"
                                                                                    className="fk-containerType fk-fr tab-pane fade">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice">
                                                                                            <h5>Size</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_fr_size"
                                                                                                        id="cargo_fr_size_0_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_fr_size_0_0">
                                                                                                        20"
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_fr_size"
                                                                                                        id="cargo_fr_size_1_0" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_fr_size_1_0">
                                                                                                        40"
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice dimension_wrap">
                                                                                            <h5>Dimensions in</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_fr_dimension"
                                                                                                        id="cargo_fr_dimension_0_0"
                                                                                                        value="m"
                                                                                                        checked />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_fr_dimension_0_0">
                                                                                                        M
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_fr_dimension"
                                                                                                        id="cargo_fr_dimension_1_0"
                                                                                                        value="cm" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_fr_dimension_1_0">
                                                                                                        CM
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_fr_dimension"
                                                                                                        id="cargo_fr_dimension_2_0"
                                                                                                        value="in" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_fr_dimension_2_0">
                                                                                                        IN
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                        <div className="fk-cargo-container-wrap fk-detail-container">
                                                                                            <div className="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                <div className="fk-cargo-container-inner">
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Length <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Length</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Width <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Width</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Height <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Height</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap">
                                                                                                        <h3 className="title">Weight <span>(kg)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Weight</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="delete-clone">
                                                                                                        <i className="far fa-trash-alt"></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-check fk-checkbox">
                                                                                                    <input className="form-check-input" type="checkbox" value=""
                                                                                                        id="ingauge_container_0" />
                                                                                                    <label className="form-check-label" for="ingauge_container_0">
                                                                                                        In-gauge
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="fk-cargo-container-btn">
                                                                                            <button type="button" className="btn btn-default btn-cargo btn-clone">Add Container</button>
                                                                                            <button type="button" className="btn btn-default btn-cargo">Add</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cargo-remark">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Remark</h3>
                                                                                <div className="form-field single-field material-textfield-textarea">
                                                                                    <textarea id="cargo_msg" name="cargo_msg" placeholder=" " className="form-control" rows="8" cols="50"></textarea>
                                                                                    <label>Message</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-default btn-booking" id="btn-fcl-booking">Get Rates</button>
                                                                </form>
                                                                <form id="lcl" role="tabpanel" aria-labelledby="lcl-tab" action="/"
                                                                    className="fk-booking-form fk-lcl-form tab-pane fade">
                                                                    <div className="fk-booking-detail fk-origin">
                                                                        <h4>Origin</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door pickup by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="fk-booking-choice-info">
                                                                                    <p>Local charges included.</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Origin Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Origin Port / City</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Origin Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Cargo Ready Date</h3>
                                                                                <div
                                                                                    className="material-textfield material-textfield-calender">
                                                                                    <input className="datepicker" placeholder=" "
                                                                                        type="text" />
                                                                                    <label>Date</label>
                                                                                    <img className="calender-icon"
                                                                                        src="./assets/images/svg/calender.svg"
                                                                                        alt="calender_icon" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="fk-booking-detail fk-destination">
                                                                        <h4>Destination</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door delivery by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Destination Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Destination Port / City</h3>
                                                                                <div className="form-field single-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Destination Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="fk-booking-detail fk-cargo">
                                                                        <h4>Cargo</h4>
                                                                        <div className="fk-cargo-choice dang_cargo_wrap">
                                                                            <div className="form-radio mb-4">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_type_lcl"
                                                                                        id="cargo_type_lcl_0_0"
                                                                                        value="non-danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_lcl_0_0">
                                                                                        Non-Dangerous
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input dang_cargo" type="radio"
                                                                                        name="cargo_type_lcl"
                                                                                        id="cargo_type_lcl_1_0"
                                                                                        value="danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_lcl_1_0">
                                                                                        Dangerous
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-cargo-choice">
                                                                            <div className="form-radio">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_stack_lcl"
                                                                                        id="cargo_stack_lcl_0_0"
                                                                                        value="stackable" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_stack_lcl_0_0">
                                                                                        Stackable
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_stack_lcl"
                                                                                        id="cargo_stack_lcl_1_0"
                                                                                        value="non-stackable" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_stack_lcl_1_0">
                                                                                        Non-Stackable
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-field file-input cargo-doc">
                                                                            <input
                                                                                type="file"
                                                                                name="file-input"
                                                                                id="file-input"
                                                                                className="file-input__input"
                                                                                multiple
                                                                                accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                            />
                                                                            <label className="file-input__label" for="file-input">
                                                                                <svg
                                                                                    aria-hidden="true"
                                                                                    focusable="false"
                                                                                    data-prefix="fas"
                                                                                    data-icon="upload"
                                                                                    className="svg-inline--fa fa-upload fa-w-16"
                                                                                    role="img"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 512 512"
                                                                                >
                                                                                    <path
                                                                                        fill="currentColor"
                                                                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                                    ></path>
                                                                                </svg>
                                                                                <span>Upload MSDS</span></label
                                                                            >
                                                                        </div>

                                                                        <div className="cargo-container-type">
                                                                            <div className="cargo-type-content">
                                                                                <div id="type_lcl" className="fk-containerType fk-fr">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice dimension_wrap">
                                                                                            <h5>Dimensions in</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_lcl_dimension"
                                                                                                        id="cargo_lcl_dimension_0_0"
                                                                                                        value="m"
                                                                                                        checked />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_lcl_dimension_0_0">
                                                                                                        M
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_lcl_dimension"
                                                                                                        id="cargo_lcl_dimension_1_0"
                                                                                                        value="cm" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_lcl_dimension_1_0">
                                                                                                        CM
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_lcl_dimension"
                                                                                                        id="cargo_lcl_dimension_2_0"
                                                                                                        value="in" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_lcl_dimension_2_0">
                                                                                                        IN
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                        <div className="fk-cargo-container-wrap fk-detail-container">
                                                                                            <div className="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                <h4>Product</h4>
                                                                                                <div className="fk-cargo-container-inner">
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Length <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Length</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Width <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Width</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Height <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Height</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap">
                                                                                                        <h3 className="title">Weight <span>(kg)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Weight</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="delete-clone">
                                                                                                        <i className="far fa-trash-alt"></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Count</h3>
                                                                                                    <div className="quantity-field">
                                                                                                        <img className="sub"
                                                                                                            src="./assets/images/svg/sub.svg"
                                                                                                            alt="sub" />
                                                                                                        <input type="number" value="0" />
                                                                                                        <img className="add"
                                                                                                            src="./assets/images/svg/add.svg"
                                                                                                            alt="add" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="fk-cargo-container-btn">
                                                                                            <button type="button" className="btn btn-default btn-cargo btn-clone">Add Product</button>
                                                                                            <button type="button" className="btn btn-default btn-cargo">Add</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cargo-remark">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Remark</h3>
                                                                                <div className="form-field single-field material-textfield-textarea">
                                                                                    <textarea id="cargo_msg" name="cargo_msg" placeholder=" " className="form-control" rows="8" cols="50"></textarea>
                                                                                    <label>Message</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-default btn-booking" id="btn-lcl-booking">Get Rates</button>
                                                                </form>
                                                                <form id="air" role="tabpanel" aria-labelledby="air-tab" action="/"
                                                                    className="fk-booking-form fk-air-form tab-pane fade">
                                                                    <div className="fk-booking-detail fk-origin">
                                                                        <h4>Origin</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door pickup by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="fk-booking-choice-info">
                                                                                    <p>Local charges included.</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Origin Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Origin Port / City</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Origin Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Cargo Ready Date</h3>
                                                                                <div
                                                                                    className="material-textfield material-textfield-calender">
                                                                                    <input className="datepicker" placeholder=" "
                                                                                        type="text" />
                                                                                    <label>Date</label>
                                                                                    <img className="calender-icon"
                                                                                        src="./assets/images/svg/calender.svg"
                                                                                        alt="calender_icon" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="fk-booking-detail fk-destination">
                                                                        <h4>Destination</h4>
                                                                        <div className="fk-booking-choice">
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-truck-moving"></i>
                                                                                        <h4>Door delivery by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="fk-booking-choice-listWrap">
                                                                                <div className="fk-booking-choice-list">
                                                                                    <div className="fk-booking-choice-title">
                                                                                        <i className="fas fa-file-alt"></i>
                                                                                        <h4>Destination Customs by FK</h4>
                                                                                    </div>
                                                                                    <div className='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox' />
                                                                                            <span className='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-booking-field">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Destination Port / City</h3>
                                                                                <div className="form-field single-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Destination Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-field-wrap address">
                                                                                <h3 className="title">Pickup Address</h3>
                                                                                <div className="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        className="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="fk-booking-detail fk-cargo">
                                                                        <h4>Cargo</h4>
                                                                        <div className="fk-cargo-choice dang_cargo_wrap">
                                                                            <div className="form-radio mb-4">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_type_air"
                                                                                        id="cargo_type_air_0_0"
                                                                                        value="non-danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_air_0_0">
                                                                                        Non-Dangerous
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input dang_cargo" type="radio"
                                                                                        name="cargo_type_air"
                                                                                        id="cargo_type_air_1_0"
                                                                                        value="danger" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_type_air_1_0">
                                                                                        Dangerous
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="fk-cargo-choice">
                                                                            <div className="form-radio">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_stack_air"
                                                                                        id="cargo_stack_air_0_0"
                                                                                        value="stackable" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_stack_air_0_0">
                                                                                        Stackable
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio"
                                                                                        name="cargo_stack_air"
                                                                                        id="cargo_stack_air_1_0"
                                                                                        value="non-stackable" />
                                                                                    <label className="form-check-label"
                                                                                        for="cargo_stack_air_1_0">
                                                                                        Non-Stackable
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="form-field file-input cargo-doc">
                                                                            <input
                                                                                type="file"
                                                                                name="file-input"
                                                                                id="file-input"
                                                                                className="file-input__input"
                                                                                multiple
                                                                                accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                            />
                                                                            <label className="file-input__label" for="file-input">
                                                                                <svg
                                                                                    aria-hidden="true"
                                                                                    focusable="false"
                                                                                    data-prefix="fas"
                                                                                    data-icon="upload"
                                                                                    className="svg-inline--fa fa-upload fa-w-16"
                                                                                    role="img"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    viewBox="0 0 512 512"
                                                                                >
                                                                                    <path
                                                                                        fill="currentColor"
                                                                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                                    ></path>
                                                                                </svg>
                                                                                <span>Upload MSDS</span></label
                                                                            >
                                                                        </div>

                                                                        <div className="cargo-container-type">
                                                                            <div className="cargo-type-content">
                                                                                <div id="type_air" className="fk-containerType fk-fr">
                                                                                    <div className="fk-cargo-detail">
                                                                                        <div className="fk-cargo-choice dimension_wrap">
                                                                                            <h5>Dimensions in</h5>
                                                                                            <div className="form-radio">
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_air_dimension"
                                                                                                        id="cargo_air_dimension_0_0"
                                                                                                        value="m"
                                                                                                        checked />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_air_dimension_0_0">
                                                                                                        M
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_air_dimension"
                                                                                                        id="cargo_air_dimension_1_0"
                                                                                                        value="cm" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_air_dimension_1_0">
                                                                                                        CM
                                                                                                    </label>
                                                                                                </div>
                                                                                                <div className="form-check dimension-check">
                                                                                                    <input className="form-check-input" type="radio"
                                                                                                        name="cargo_air_dimension"
                                                                                                        id="cargo_air_dimension_2_0"
                                                                                                        value="in" />
                                                                                                    <label className="form-check-label"
                                                                                                        for="cargo_air_dimension_2_0">
                                                                                                        IN
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                        <div className="fk-cargo-container-wrap fk-detail-container">
                                                                                            <div className="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                <h4>Product</h4>
                                                                                                <div className="fk-cargo-container-inner">
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Length <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Length</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Width <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Width</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap fk-product-scale">
                                                                                                        <h3 className="title">Height <span>(m)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Height</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="form-field-wrap">
                                                                                                        <h3 className="title">Weight <span>(kg)</span></h3>
                                                                                                        <div className="form-field material-textfield">
                                                                                                            <input type="number" placeholder=" "
                                                                                                                className="form-control" />
                                                                                                            <label>Weight</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="delete-clone">
                                                                                                        <i className="far fa-trash-alt"></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="form-field-wrap">
                                                                                                    <h3 className="title">Count</h3>
                                                                                                    <div className="quantity-field">
                                                                                                        <img className="sub" src="./assets/images/svg/sub.svg" alt="sub" />
                                                                                                        <input type="number" value="0" />
                                                                                                        <img className="add"
                                                                                                            src="./assets/images/svg/add.svg"
                                                                                                            alt="add" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="fk-cargo-container-btn">
                                                                                            <button type="button" className="btn btn-default btn-cargo btn-clone">Add Product</button>
                                                                                            <button type="button" className="btn btn-default btn-cargo">Add</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="cargo-remark">
                                                                            <div className="form-field-wrap">
                                                                                <h3 className="title">Remark</h3>
                                                                                <div className="form-field single-field material-textfield-textarea">
                                                                                    <textarea id="cargo_msg" name="cargo_msg" placeholder=" " className="form-control" rows="8" cols="50"></textarea>
                                                                                    <label>Message</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="btn btn-default btn-booking" id="btn-air-booking">Get Rates</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shell-footer">
                                                <div className="shell-copy-right">&copy; 2021 Freight Kare. All rights reserved</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 mob-menu-wrapper">
                                        <ul className="nav-menu">
                                            <li className="nav-menuList nav-menuList-active">
                                                <a href="./index.html">
                                                    <span>Home</span>
                                                </a>
                                            </li>
                                            <li className="nav-menuList">
                                                <a href="./aboutus.html">
                                                    <span>About us</span>
                                                </a>
                                            </li>
                                            <li className="nav-menuList">
                                                <a href="./contact.html">
                                                    <span>Contact</span>
                                                </a>
                                            </li>
                                            <li className="nav-menuList">
                                                <a href="./booking.html">
                                                    <span>Booking</span>
                                                </a>
                                            </li>
                                            <li className="nav-menuList">
                                                <a href="./login.html">
                                                    <span>Sign In</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


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