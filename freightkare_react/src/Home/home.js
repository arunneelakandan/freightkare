import React, { useState, useEffect, createContext } from "react";
import { Menu, Button, Result } from 'antd';
import { AppstoreOutlined, PieChartOutlined, ProjectOutlined, ExportOutlined, WifiOutlined, LineChartOutlined, HddOutlined, TeamOutlined, HomeOutlined, RiseOutlined, DashboardOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
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


                            <div class="container-fluid container-shell">
                                <div class="row">


                                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 shell-main">
                                        <div class="shell-inner">
                                            <div class="shell-header">
                                                <div class="logo-wrap">
                                                    <a href="./index.html">
                                                        <img src="./assets/images/svg/fk_logo.svg" alt="logo">
                                                    </a>
                                                </div>
                                                <ul class="nav-menu">
                                                    <li class="nav-menuList">
                                                        <a href="./index.html">
                                                            <span>Home</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-menuList">
                                                        <a href="./quote.html">
                                                            <span>Quote</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-menuList nav-menuList-active">
                                                        <a href="./booking.html">
                                                            <span>Booking</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-menuList">
                                                        <a href="./aboutus.html">
                                                            <span>About us</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-menuList">
                                                        <a href="./contact.html">
                                                            <span>Contact</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-menuList">
                                                        <a href="./login.html">
                                                            <span>Sign In</span>
                                                        </a>
                                                    </li>

                                                </ul>

                                                <div class="mob-menu-icon">
                                                    <div class="menu-icon"></div>
                                                </div>

                                            </div>
                                            <div class="shell-body">
                                                <div class="fk-booking-wrap">
                                                    <div class="fk-booking-form-wrap">
                                                        <h1>Create a booking</h1>
                                                        <h3>Type of booking</h3>

                                                        <div class="fk-booking-tabs">
                                                            <ul class="nav nav-tabs" id="fk-booking-tablist" role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link active" id="fcl-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#fcl" type="button" role="tab"
                                                                        aria-controls="fcl-tab" aria-selected="true">
                                                                        <i class="fas fa-truck-moving"></i>
                                                                        FCL
                                                                    </button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="lcl-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#lcl" type="button" role="tab"
                                                                        aria-controls="lcl-tab" aria-selected="false">
                                                                        <i class="fas fa-box-open"></i>
                                                                        LCL
                                                                    </button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="air-tab" data-bs-toggle="tab"
                                                                        data-bs-target="#air" type="button" role="tab"
                                                                        aria-controls="air-tab" aria-selected="false">
                                                                        <i class="fas fa-fighter-jet"></i>
                                                                        Air
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                            <div class="tab-content fk-booking-content" id="fk-booking-content">


                                                                <form id="fcl" role="tabpanel" aria-labelledby="fcl-tab" action="/"
                                                                    class="fk-booking-form fk-fcl-form tab-pane fade show active">
                                                                    <div class="fk-booking-detail fk-origin">
                                                                        <h4>Origin</h4>
                                                                        <div class="fk-booking-choice">
                                                                            <div class="fk-booking-choice-listWrap">
                                                                                <div class="fk-booking-choice-list">
                                                                                    <div class="fk-booking-choice-title">
                                                                                        <i class="fas fa-truck-moving"></i>
                                                                                        <h4>Door pickup by FK</h4>
                                                                                    </div>
                                                                                    <div class='toggle-switch transport'>
                                                                                        <label>
                                                                                            <input type='checkbox'>
                                                                                                <span class='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="fk-booking-choice-info">
                                                                                    <p>Local charges included.</p>
                                                                                </div>
                                                                            </div>
                                                                            <div class="fk-booking-choice-listWrap">
                                                                                <div class="fk-booking-choice-list">
                                                                                    <div class="fk-booking-choice-title">
                                                                                        <i class="fas fa-file-alt"></i>
                                                                                        <h4>Origin Customs by FK</h4>
                                                                                    </div>
                                                                                    <div class='toggle-switch'>
                                                                                        <label>
                                                                                            <input type='checkbox'>
                                                                                                <span class='slider'></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="fk-booking-field">
                                                                            <div class="form-field-wrap">
                                                                                <h3 class="title">Origin Port / City</h3>
                                                                                <div class="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        class="form-control" />
                                                                                    <label>Origin Port / City</label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-field-wrap address">
                                                                                <h3 class="title">Pickup Address</h3>
                                                                                <div class="form-field material-textfield">
                                                                                    <input type="text" placeholder=" "
                                                                                        class="form-control" />
                                                                                    <label>Address</label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-field-wrap">
                                                                                <h3 class="title">Cargo Ready Date</h3>
                                                                                <div
                                                                                    class="material-textfield material-textfield-calender">
                                                                                    <input class="datepicker" placeholder=" "
                                                                                        type="text">
                                                                                        <label>Date</label>
                                                                                        <img class="calender-icon"
                                                                                            src="./assets/images/svg/calender.svg"
                                                                                            alt="calender_icon">
                                                                                        </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div class="fk-booking-detail fk-destination">
                                                                            <h4>Destination</h4>
                                                                            <div class="fk-booking-choice">
                                                                                <div class="fk-booking-choice-listWrap">
                                                                                    <div class="fk-booking-choice-list">
                                                                                        <div class="fk-booking-choice-title">
                                                                                            <i class="fas fa-truck-moving"></i>
                                                                                            <h4>Door delivery by FK</h4>
                                                                                        </div>
                                                                                        <div class='toggle-switch transport'>
                                                                                            <label>
                                                                                                <input type='checkbox'>
                                                                                                    <span class='slider'></span>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="fk-booking-choice-listWrap">
                                                                                    <div class="fk-booking-choice-list">
                                                                                        <div class="fk-booking-choice-title">
                                                                                            <i class="fas fa-file-alt"></i>
                                                                                            <h4>Destination Customs by FK</h4>
                                                                                        </div>
                                                                                        <div class='toggle-switch'>
                                                                                            <label>
                                                                                                <input type='checkbox'>
                                                                                                    <span class='slider'></span>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="fk-booking-field">
                                                                                <div class="form-field-wrap">
                                                                                    <h3 class="title">Destination Port / City</h3>
                                                                                    <div class="form-field single-field material-textfield">
                                                                                        <input type="text" placeholder=" "
                                                                                            class="form-control" />
                                                                                        <label>Destination Port / City</label>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="form-field-wrap address">
                                                                                    <h3 class="title">Pickup Address</h3>
                                                                                    <div class="form-field material-textfield">
                                                                                        <input type="text" placeholder=" "
                                                                                            class="form-control" />
                                                                                        <label>Address</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="fk-booking-detail fk-cargo">
                                                                            <h4>Cargo</h4>
                                                                            <div class="fk-cargo-choice dang_cargo_wrap">
                                                                                <div class="form-radio">
                                                                                    <div class="form-check">
                                                                                        <input class="form-check-input" type="radio"
                                                                                            name="cargo_type_fcl"
                                                                                            id="cargo_type_fcl_0_0"
                                                                                            value="non-danger">
                                                                                            <label class="form-check-label"
                                                                                                for="cargo_type_fcl_0_0">
                                                                                                Non-Dangerous
                                                                                            </label>
                                                                                    </div>
                                                                                    <div class="form-check">
                                                                                        <input class="form-check-input dang_cargo" type="radio"
                                                                                            name="cargo_type_fcl"
                                                                                            id="cargo_type_fcl_1_0"
                                                                                            value="danger">
                                                                                            <label class="form-check-label"
                                                                                                for="cargo_type_fcl_1_0">
                                                                                                Dangerous
                                                                                            </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div class="form-field file-input cargo-doc">
                                                                                <input
                                                                                    type="file"
                                                                                    name="file-input"
                                                                                    id="file-input"
                                                                                    class="file-input__input"
                                                                                    multiple
                                                                                    accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                                />
                                                                                <label class="file-input__label" for="file-input">
                                                                                    <svg
                                                                                        aria-hidden="true"
                                                                                        focusable="false"
                                                                                        data-prefix="fas"
                                                                                        data-icon="upload"
                                                                                        class="svg-inline--fa fa-upload fa-w-16"
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

                                                                            <div class="cargo-container-type">
                                                                                <h2>Container Type</h2>
                                                                                <ul class="nav nav-tabs" id="fk-booking-tablist" role="tablist">
                                                                                    <li class="nav-item" role="presentation">
                                                                                        <button class="nav-link active" id="gc-tab" data-bs-toggle="tab"
                                                                                            data-bs-target="#type_gc" type="button" role="tab"
                                                                                            aria-controls="gc-tab" aria-selected="true">
                                                                                            GC
                                                                                        </button>
                                                                                    </li>
                                                                                    <li class="nav-item" role="presentation">
                                                                                        <button class="nav-link" id="ot-tab" data-bs-toggle="tab"
                                                                                            data-bs-target="#type_ot" type="button" role="tab"
                                                                                            aria-controls="ot-tab" aria-selected="false">
                                                                                            OT
                                                                                        </button>
                                                                                    </li>
                                                                                    <li class="nav-item" role="presentation">
                                                                                        <button class="nav-link" id="reef-tab" data-bs-toggle="tab"
                                                                                            data-bs-target="#type_reef" type="button" role="tab"
                                                                                            aria-controls="reef-tab" aria-selected="false">
                                                                                            REEF
                                                                                        </button>
                                                                                    </li>
                                                                                    <li class="nav-item" role="presentation">
                                                                                        <button class="nav-link" id="fr-tab" data-bs-toggle="tab"
                                                                                            data-bs-target="#type_fr" type="button" role="tab"
                                                                                            aria-controls="fr-tab" aria-selected="false">
                                                                                            FR
                                                                                        </button>
                                                                                    </li>
                                                                                </ul>
                                                                                <div class="tab-content cargo-type-content">
                                                                                    <div id="type_gc" role="tabpanel" aria-labelledby="gc-tab" action="/"
                                                                                        class="fk-containerType fk-gc tab-pane fade show active">
                                                                                        <div class="fk-cargo-detail">
                                                                                            <div class="fk-cargo-choice">
                                                                                                <h5>Size</h5>
                                                                                                <div class="form-radio">
                                                                                                    <div class="form-check">
                                                                                                        <input class="form-check-input" type="radio"
                                                                                                            name="cargo_gc_size"
                                                                                                            id="cargo_gc_size_0_0">
                                                                                                            <label class="form-check-label"
                                                                                                                for="cargo_gc_size_0_0">
                                                                                                                20"
                                                                                                            </label>
                                                                                                    </div>
                                                                                                    <div class="form-check">
                                                                                                        <input class="form-check-input" type="radio"
                                                                                                            name="cargo_gc_size"
                                                                                                            id="cargo_gc_size_1_0">
                                                                                                            <label class="form-check-label"
                                                                                                                for="cargo_gc_size_1_0">
                                                                                                                40"
                                                                                                            </label>
                                                                                                    </div>
                                                                                                    <div class="form-check">
                                                                                                        <input class="form-check-input" type="radio"
                                                                                                            name="cargo_gc_size"
                                                                                                            id="cargo_gc_size_2_0">
                                                                                                            <label class="form-check-label"
                                                                                                                for="cargo_gc_size_2_0">
                                                                                                                20" HC
                                                                                                            </label>
                                                                                                    </div>
                                                                                                    <div class="form-check">
                                                                                                        <input class="form-check-input" type="radio"
                                                                                                            name="cargo_gc_size"
                                                                                                            id="cargo_gc_size_3_0">
                                                                                                            <label class="form-check-label"
                                                                                                                for="cargo_gc_size_3_0">
                                                                                                                40" HC
                                                                                                            </label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="fk-cargo-detail">
                                                                                            <div class="fk-total-cargo">
                                                                                                <div class="form-field-multi fk-cargo-count">
                                                                                                    <div class="form-field-wrap">
                                                                                                        <h3 class="title">Count</h3>
                                                                                                        <div class="quantity-field">
                                                                                                            <img class="sub"
                                                                                                                src="./assets/images/svg/sub.svg"
                                                                                                                alt="sub">
                                                                                                                <input type="number" value="0">
                                                                                                                    <img class="add"
                                                                                                                        src="./assets/images/svg/add.svg"
                                                                                                                        alt="add">
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="form-field-wrap">
                                                                                                                    <h3 class="title">Weight (mt)</h3>
                                                                                                                    <div class="form-field material-textfield">
                                                                                                                        <input type="number" placeholder=" " min="1"
                                                                                                                            class="form-control" />
                                                                                                                        <label>Enter weight</label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <button type="button" class="btn btn-default btn-cargo">ADD</button>
                                                                                            </div>
                                                                                            <div id="type_ot" role="tabpanel" aria-labelledby="ot-tab" action="/"
                                                                                                class="fk-containerType fk-ot tab-pane fade">
                                                                                                <div class="fk-cargo-detail">
                                                                                                    <div class="fk-cargo-choice">
                                                                                                        <h5>Size</h5>
                                                                                                        <div class="form-radio">
                                                                                                            <div class="form-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_ot_size"
                                                                                                                    id="cargo_ot_size_0_0">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_ot_size_0_0">
                                                                                                                        20"
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                            <div class="form-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_ot_size"
                                                                                                                    id="cargo_ot_size_1_0">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_ot_size_1_0">
                                                                                                                        40"
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-cargo-detail">
                                                                                                    <div class="fk-cargo-choice dimension_wrap">
                                                                                                        <h5>Dimensions in</h5>
                                                                                                        <div class="form-radio">
                                                                                                            <div class="form-check dimension-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_ot_dimension"
                                                                                                                    id="cargo_ot_dimension_0_0"
                                                                                                                    value="m"
                                                                                                                    checked>
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_ot_dimension_0_0">
                                                                                                                        M
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                            <div class="form-check dimension-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_ot_dimension"
                                                                                                                    id="cargo_ot_dimension_1_0"
                                                                                                                    value="cm">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_ot_dimension_1_0">
                                                                                                                        CM
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                            <div class="form-check dimension-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_ot_dimension"
                                                                                                                    id="cargo_ot_dimension_2_0"
                                                                                                                    value="in">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_ot_dimension_2_0">
                                                                                                                        IN
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                                    <div class="fk-cargo-container-wrap fk-detail-container">
                                                                                                        <div class="fk-cargo-container fk-clone">
                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                <h3 class="title">Length <span>(m)</span></h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="number" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Length</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                <h3 class="title">Width <span>(m)</span></h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="number" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Width</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                <h3 class="title">Height <span>(m)</span></h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="number" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Height</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="form-field-wrap">
                                                                                                                <h3 class="title">Weight <span>(kg)</span></h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="number" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Weight</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="delete-clone">
                                                                                                                <i class="far fa-trash-alt"></i>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="fk-cargo-container-btn">
                                                                                                        <button type="button" class="btn btn-default btn-cargo btn-clone">Add Container</button>
                                                                                                        <button type="button" class="btn btn-default btn-cargo">Add</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div id="type_reef" role="tabpanel" aria-labelledby="reef-tab" action="/"
                                                                                                class="fk-containerType fk-reef tab-pane fade">
                                                                                                <div class="fk-cargo-detail">
                                                                                                    <div class="fk-cargo-choice">
                                                                                                        <h5>Size</h5>
                                                                                                        <div class="form-radio">
                                                                                                            <div class="form-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_reef_size"
                                                                                                                    id="cargo_reef_size_0_0">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_reef_size_0_0">
                                                                                                                        20"
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                            <div class="form-check">
                                                                                                                <input class="form-check-input" type="radio"
                                                                                                                    name="cargo_reef_size"
                                                                                                                    id="cargo_reef_size_1_0">
                                                                                                                    <label class="form-check-label"
                                                                                                                        for="cargo_reef_size_1_0">
                                                                                                                        40"
                                                                                                                    </label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-cargo-detail">
                                                                                                    <div class="fk-total-cargo">
                                                                                                        <div class="form-field-multi fk-cargo-count">
                                                                                                            <div class="form-field-wrap">
                                                                                                                <h3 class="title">Count</h3>
                                                                                                                <div class="quantity-field">
                                                                                                                    <img class="sub"
                                                                                                                        src="./assets/images/svg/sub.svg"
                                                                                                                        alt="sub">
                                                                                                                        <input type="number" value="0">
                                                                                                                            <img class="add"
                                                                                                                                src="./assets/images/svg/add.svg"
                                                                                                                                alt="add">
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap">
                                                                                                                            <h3 class="title">Weight (mt)</h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" " min="1"
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Enter weight</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap">
                                                                                                                            <h3 class="title">Temp (<sup>o</sup>c)</h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" " min="1"
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Temp</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <button type="button" class="btn btn-default btn-cargo">ADD</button>
                                                                                                    </div>
                                                                                                    <div id="type_fr" role="tabpanel" aria-labelledby="fr-tab" action="/"
                                                                                                        class="fk-containerType fk-fr tab-pane fade">
                                                                                                        <div class="fk-cargo-detail">
                                                                                                            <div class="fk-cargo-choice">
                                                                                                                <h5>Size</h5>
                                                                                                                <div class="form-radio">
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_fr_size"
                                                                                                                            id="cargo_fr_size_0_0">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_fr_size_0_0">
                                                                                                                                20"
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_fr_size"
                                                                                                                            id="cargo_fr_size_1_0">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_fr_size_1_0">
                                                                                                                                40"
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="fk-cargo-detail">
                                                                                                            <div class="fk-cargo-choice dimension_wrap">
                                                                                                                <h5>Dimensions in</h5>
                                                                                                                <div class="form-radio">
                                                                                                                    <div class="form-check dimension-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_fr_dimension"
                                                                                                                            id="cargo_fr_dimension_0_0"
                                                                                                                            value="m"
                                                                                                                            checked>
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_fr_dimension_0_0">
                                                                                                                                M
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                    <div class="form-check dimension-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_fr_dimension"
                                                                                                                            id="cargo_fr_dimension_1_0"
                                                                                                                            value="cm">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_fr_dimension_1_0">
                                                                                                                                CM
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                    <div class="form-check dimension-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_fr_dimension"
                                                                                                                            id="cargo_fr_dimension_2_0"
                                                                                                                            value="in">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_fr_dimension_2_0">
                                                                                                                                IN
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                                            <div class="fk-cargo-container-wrap fk-detail-container">
                                                                                                                <div class="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                                    <div class="fk-cargo-container-inner">
                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                            <h3 class="title">Length <span>(m)</span></h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Length</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                            <h3 class="title">Width <span>(m)</span></h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Width</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                            <h3 class="title">Height <span>(m)</span></h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Height</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap">
                                                                                                                            <h3 class="title">Weight <span>(kg)</span></h3>
                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                    class="form-control" />
                                                                                                                                <label>Weight</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="delete-clone">
                                                                                                                            <i class="far fa-trash-alt"></i>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div class="form-check fk-checkbox">
                                                                                                                        <input class="form-check-input" type="checkbox" value=""
                                                                                                                            id="ingauge_container_0">
                                                                                                                            <label class="form-check-label" for="ingauge_container_0">
                                                                                                                                In-gauge
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="fk-cargo-container-btn">
                                                                                                                <button type="button" class="btn btn-default btn-cargo btn-clone">Add Container</button>
                                                                                                                <button type="button" class="btn btn-default btn-cargo">Add</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div class="cargo-remark">
                                                                                                <div class="form-field-wrap">
                                                                                                    <h3 class="title">Remark</h3>
                                                                                                    <div class="form-field single-field material-textfield-textarea">
                                                                                                        <textarea id="cargo_msg" name="cargo_msg" placeholder=" " class="form-control" rows="8" cols="50"></textarea>
                                                                                                        <label>Message</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <button type="submit" class="btn btn-default btn-booking" id="btn-fcl-booking">Get Rates</button>
                                                                                    </form>
                                                                                    <form id="lcl" role="tabpanel" aria-labelledby="lcl-tab" action="/"
                                                                                        class="fk-booking-form fk-lcl-form tab-pane fade">
                                                                                        <div class="fk-booking-detail fk-origin">
                                                                                            <h4>Origin</h4>
                                                                                            <div class="fk-booking-choice">
                                                                                                <div class="fk-booking-choice-listWrap">
                                                                                                    <div class="fk-booking-choice-list">
                                                                                                        <div class="fk-booking-choice-title">
                                                                                                            <i class="fas fa-truck-moving"></i>
                                                                                                            <h4>Door pickup by FK</h4>
                                                                                                        </div>
                                                                                                        <div class='toggle-switch transport'>
                                                                                                            <label>
                                                                                                                <input type='checkbox'>
                                                                                                                    <span class='slider'></span>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="fk-booking-choice-info">
                                                                                                        <p>Local charges included.</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-booking-choice-listWrap">
                                                                                                    <div class="fk-booking-choice-list">
                                                                                                        <div class="fk-booking-choice-title">
                                                                                                            <i class="fas fa-file-alt"></i>
                                                                                                            <h4>Origin Customs by FK</h4>
                                                                                                        </div>
                                                                                                        <div class='toggle-switch'>
                                                                                                            <label>
                                                                                                                <input type='checkbox'>
                                                                                                                    <span class='slider'></span>
                                                                                                            </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="fk-booking-field">
                                                                                                <div class="form-field-wrap">
                                                                                                    <h3 class="title">Origin Port / City</h3>
                                                                                                    <div class="form-field material-textfield">
                                                                                                        <input type="text" placeholder=" "
                                                                                                            class="form-control" />
                                                                                                        <label>Origin Port / City</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="form-field-wrap address">
                                                                                                    <h3 class="title">Pickup Address</h3>
                                                                                                    <div class="form-field material-textfield">
                                                                                                        <input type="text" placeholder=" "
                                                                                                            class="form-control" />
                                                                                                        <label>Address</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="form-field-wrap">
                                                                                                    <h3 class="title">Cargo Ready Date</h3>
                                                                                                    <div
                                                                                                        class="material-textfield material-textfield-calender">
                                                                                                        <input class="datepicker" placeholder=" "
                                                                                                            type="text">
                                                                                                            <label>Date</label>
                                                                                                            <img class="calender-icon"
                                                                                                                src="./assets/images/svg/calender.svg"
                                                                                                                alt="calender_icon">
                                                                                                            </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>
                                                                                            <div class="fk-booking-detail fk-destination">
                                                                                                <h4>Destination</h4>
                                                                                                <div class="fk-booking-choice">
                                                                                                    <div class="fk-booking-choice-listWrap">
                                                                                                        <div class="fk-booking-choice-list">
                                                                                                            <div class="fk-booking-choice-title">
                                                                                                                <i class="fas fa-truck-moving"></i>
                                                                                                                <h4>Door delivery by FK</h4>
                                                                                                            </div>
                                                                                                            <div class='toggle-switch transport'>
                                                                                                                <label>
                                                                                                                    <input type='checkbox'>
                                                                                                                        <span class='slider'></span>
                                                                                                                </label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="fk-booking-choice-listWrap">
                                                                                                        <div class="fk-booking-choice-list">
                                                                                                            <div class="fk-booking-choice-title">
                                                                                                                <i class="fas fa-file-alt"></i>
                                                                                                                <h4>Destination Customs by FK</h4>
                                                                                                            </div>
                                                                                                            <div class='toggle-switch'>
                                                                                                                <label>
                                                                                                                    <input type='checkbox'>
                                                                                                                        <span class='slider'></span>
                                                                                                                </label>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-booking-field">
                                                                                                    <div class="form-field-wrap">
                                                                                                        <h3 class="title">Destination Port / City</h3>
                                                                                                        <div class="form-field single-field material-textfield">
                                                                                                            <input type="text" placeholder=" "
                                                                                                                class="form-control" />
                                                                                                            <label>Destination Port / City</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="form-field-wrap address">
                                                                                                        <h3 class="title">Pickup Address</h3>
                                                                                                        <div class="form-field material-textfield">
                                                                                                            <input type="text" placeholder=" "
                                                                                                                class="form-control" />
                                                                                                            <label>Address</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="fk-booking-detail fk-cargo">
                                                                                                <h4>Cargo</h4>
                                                                                                <div class="fk-cargo-choice dang_cargo_wrap">
                                                                                                    <div class="form-radio mb-4">
                                                                                                        <div class="form-check">
                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                name="cargo_type_lcl"
                                                                                                                id="cargo_type_lcl_0_0"
                                                                                                                value="non-danger">
                                                                                                                <label class="form-check-label"
                                                                                                                    for="cargo_type_lcl_0_0">
                                                                                                                    Non-Dangerous
                                                                                                                </label>
                                                                                                        </div>
                                                                                                        <div class="form-check">
                                                                                                            <input class="form-check-input dang_cargo" type="radio"
                                                                                                                name="cargo_type_lcl"
                                                                                                                id="cargo_type_lcl_1_0"
                                                                                                                value="danger">
                                                                                                                <label class="form-check-label"
                                                                                                                    for="cargo_type_lcl_1_0">
                                                                                                                    Dangerous
                                                                                                                </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="fk-cargo-choice">
                                                                                                    <div class="form-radio">
                                                                                                        <div class="form-check">
                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                name="cargo_stack_lcl"
                                                                                                                id="cargo_stack_lcl_0_0"
                                                                                                                value="stackable">
                                                                                                                <label class="form-check-label"
                                                                                                                    for="cargo_stack_lcl_0_0">
                                                                                                                    Stackable
                                                                                                                </label>
                                                                                                        </div>
                                                                                                        <div class="form-check">
                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                name="cargo_stack_lcl"
                                                                                                                id="cargo_stack_lcl_1_0"
                                                                                                                value="non-stackable">
                                                                                                                <label class="form-check-label"
                                                                                                                    for="cargo_stack_lcl_1_0">
                                                                                                                    Non-Stackable
                                                                                                                </label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div class="form-field file-input cargo-doc">
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        name="file-input"
                                                                                                        id="file-input"
                                                                                                        class="file-input__input"
                                                                                                        multiple
                                                                                                        accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                                                    />
                                                                                                    <label class="file-input__label" for="file-input">
                                                                                                        <svg
                                                                                                            aria-hidden="true"
                                                                                                            focusable="false"
                                                                                                            data-prefix="fas"
                                                                                                            data-icon="upload"
                                                                                                            class="svg-inline--fa fa-upload fa-w-16"
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

                                                                                                <div class="cargo-container-type">
                                                                                                    <div class="cargo-type-content">
                                                                                                        <div id="type_lcl" class="fk-containerType fk-fr">
                                                                                                            <div class="fk-cargo-detail">
                                                                                                                <div class="fk-cargo-choice dimension_wrap">
                                                                                                                    <h5>Dimensions in</h5>
                                                                                                                    <div class="form-radio">
                                                                                                                        <div class="form-check dimension-check">
                                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                                name="cargo_lcl_dimension"
                                                                                                                                id="cargo_lcl_dimension_0_0"
                                                                                                                                value="m"
                                                                                                                                checked>
                                                                                                                                <label class="form-check-label"
                                                                                                                                    for="cargo_lcl_dimension_0_0">
                                                                                                                                    M
                                                                                                                                </label>
                                                                                                                        </div>
                                                                                                                        <div class="form-check dimension-check">
                                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                                name="cargo_lcl_dimension"
                                                                                                                                id="cargo_lcl_dimension_1_0"
                                                                                                                                value="cm">
                                                                                                                                <label class="form-check-label"
                                                                                                                                    for="cargo_lcl_dimension_1_0">
                                                                                                                                    CM
                                                                                                                                </label>
                                                                                                                        </div>
                                                                                                                        <div class="form-check dimension-check">
                                                                                                                            <input class="form-check-input" type="radio"
                                                                                                                                name="cargo_lcl_dimension"
                                                                                                                                id="cargo_lcl_dimension_2_0"
                                                                                                                                value="in">
                                                                                                                                <label class="form-check-label"
                                                                                                                                    for="cargo_lcl_dimension_2_0">
                                                                                                                                    IN
                                                                                                                                </label>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                                                <div class="fk-cargo-container-wrap fk-detail-container">
                                                                                                                    <div class="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                                        <h4>Product</h4>
                                                                                                                        <div class="fk-cargo-container-inner">
                                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                                <h3 class="title">Length <span>(m)</span></h3>
                                                                                                                                <div class="form-field material-textfield">
                                                                                                                                    <input type="number" placeholder=" "
                                                                                                                                        class="form-control" />
                                                                                                                                    <label>Length</label>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                                <h3 class="title">Width <span>(m)</span></h3>
                                                                                                                                <div class="form-field material-textfield">
                                                                                                                                    <input type="number" placeholder=" "
                                                                                                                                        class="form-control" />
                                                                                                                                    <label>Width</label>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="form-field-wrap fk-product-scale">
                                                                                                                                <h3 class="title">Height <span>(m)</span></h3>
                                                                                                                                <div class="form-field material-textfield">
                                                                                                                                    <input type="number" placeholder=" "
                                                                                                                                        class="form-control" />
                                                                                                                                    <label>Height</label>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="form-field-wrap">
                                                                                                                                <h3 class="title">Weight <span>(kg)</span></h3>
                                                                                                                                <div class="form-field material-textfield">
                                                                                                                                    <input type="number" placeholder=" "
                                                                                                                                        class="form-control" />
                                                                                                                                    <label>Weight</label>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="delete-clone">
                                                                                                                                <i class="far fa-trash-alt"></i>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="form-field-wrap">
                                                                                                                            <h3 class="title">Count</h3>
                                                                                                                            <div class="quantity-field">
                                                                                                                                <img class="sub"
                                                                                                                                    src="./assets/images/svg/sub.svg"
                                                                                                                                    alt="sub">
                                                                                                                                    <input type="number" value="0">
                                                                                                                                        <img class="add"
                                                                                                                                            src="./assets/images/svg/add.svg"
                                                                                                                                            alt="add">
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="fk-cargo-container-btn">
                                                                                                                            <button type="button" class="btn btn-default btn-cargo btn-clone">Add Product</button>
                                                                                                                            <button type="button" class="btn btn-default btn-cargo">Add</button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div class="cargo-remark">
                                                                                                            <div class="form-field-wrap">
                                                                                                                <h3 class="title">Remark</h3>
                                                                                                                <div class="form-field single-field material-textfield-textarea">
                                                                                                                    <textarea id="cargo_msg" name="cargo_msg" placeholder=" " class="form-control" rows="8" cols="50"></textarea>
                                                                                                                    <label>Message</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <button type="submit" class="btn btn-default btn-booking" id="btn-lcl-booking">Get Rates</button>
                                                                                                </form>
                                                                                                <form id="air" role="tabpanel" aria-labelledby="air-tab" action="/"
                                                                                                    class="fk-booking-form fk-air-form tab-pane fade">
                                                                                                    <div class="fk-booking-detail fk-origin">
                                                                                                        <h4>Origin</h4>
                                                                                                        <div class="fk-booking-choice">
                                                                                                            <div class="fk-booking-choice-listWrap">
                                                                                                                <div class="fk-booking-choice-list">
                                                                                                                    <div class="fk-booking-choice-title">
                                                                                                                        <i class="fas fa-truck-moving"></i>
                                                                                                                        <h4>Door pickup by FK</h4>
                                                                                                                    </div>
                                                                                                                    <div class='toggle-switch transport'>
                                                                                                                        <label>
                                                                                                                            <input type='checkbox'>
                                                                                                                                <span class='slider'></span>
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="fk-booking-choice-info">
                                                                                                                    <p>Local charges included.</p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="fk-booking-choice-listWrap">
                                                                                                                <div class="fk-booking-choice-list">
                                                                                                                    <div class="fk-booking-choice-title">
                                                                                                                        <i class="fas fa-file-alt"></i>
                                                                                                                        <h4>Origin Customs by FK</h4>
                                                                                                                    </div>
                                                                                                                    <div class='toggle-switch'>
                                                                                                                        <label>
                                                                                                                            <input type='checkbox'>
                                                                                                                                <span class='slider'></span>
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="fk-booking-field">
                                                                                                            <div class="form-field-wrap">
                                                                                                                <h3 class="title">Origin Port / City</h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="text" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Origin Port / City</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="form-field-wrap address">
                                                                                                                <h3 class="title">Pickup Address</h3>
                                                                                                                <div class="form-field material-textfield">
                                                                                                                    <input type="text" placeholder=" "
                                                                                                                        class="form-control" />
                                                                                                                    <label>Address</label>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="form-field-wrap">
                                                                                                                <h3 class="title">Cargo Ready Date</h3>
                                                                                                                <div
                                                                                                                    class="material-textfield material-textfield-calender">
                                                                                                                    <input class="datepicker" placeholder=" "
                                                                                                                        type="text">
                                                                                                                        <label>Date</label>
                                                                                                                        <img class="calender-icon"
                                                                                                                            src="./assets/images/svg/calender.svg"
                                                                                                                            alt="calender_icon">
                                                                                                                        </div>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                        <div class="fk-booking-detail fk-destination">
                                                                                                            <h4>Destination</h4>
                                                                                                            <div class="fk-booking-choice">
                                                                                                                <div class="fk-booking-choice-listWrap">
                                                                                                                    <div class="fk-booking-choice-list">
                                                                                                                        <div class="fk-booking-choice-title">
                                                                                                                            <i class="fas fa-truck-moving"></i>
                                                                                                                            <h4>Door delivery by FK</h4>
                                                                                                                        </div>
                                                                                                                        <div class='toggle-switch transport'>
                                                                                                                            <label>
                                                                                                                                <input type='checkbox'>
                                                                                                                                    <span class='slider'></span>
                                                                                                                            </label>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="fk-booking-choice-listWrap">
                                                                                                                    <div class="fk-booking-choice-list">
                                                                                                                        <div class="fk-booking-choice-title">
                                                                                                                            <i class="fas fa-file-alt"></i>
                                                                                                                            <h4>Destination Customs by FK</h4>
                                                                                                                        </div>
                                                                                                                        <div class='toggle-switch'>
                                                                                                                            <label>
                                                                                                                                <input type='checkbox'>
                                                                                                                                    <span class='slider'></span>
                                                                                                                            </label>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="fk-booking-field">
                                                                                                                <div class="form-field-wrap">
                                                                                                                    <h3 class="title">Destination Port / City</h3>
                                                                                                                    <div class="form-field single-field material-textfield">
                                                                                                                        <input type="text" placeholder=" "
                                                                                                                            class="form-control" />
                                                                                                                        <label>Destination Port / City</label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div class="form-field-wrap address">
                                                                                                                    <h3 class="title">Pickup Address</h3>
                                                                                                                    <div class="form-field material-textfield">
                                                                                                                        <input type="text" placeholder=" "
                                                                                                                            class="form-control" />
                                                                                                                        <label>Address</label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div class="fk-booking-detail fk-cargo">
                                                                                                            <h4>Cargo</h4>
                                                                                                            <div class="fk-cargo-choice dang_cargo_wrap">
                                                                                                                <div class="form-radio mb-4">
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_type_air"
                                                                                                                            id="cargo_type_air_0_0"
                                                                                                                            value="non-danger">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_type_air_0_0">
                                                                                                                                Non-Dangerous
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input dang_cargo" type="radio"
                                                                                                                            name="cargo_type_air"
                                                                                                                            id="cargo_type_air_1_0"
                                                                                                                            value="danger">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_type_air_1_0">
                                                                                                                                Dangerous
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div class="fk-cargo-choice">
                                                                                                                <div class="form-radio">
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_stack_air"
                                                                                                                            id="cargo_stack_air_0_0"
                                                                                                                            value="stackable">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_stack_air_0_0">
                                                                                                                                Stackable
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                    <div class="form-check">
                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                            name="cargo_stack_air"
                                                                                                                            id="cargo_stack_air_1_0"
                                                                                                                            value="non-stackable">
                                                                                                                            <label class="form-check-label"
                                                                                                                                for="cargo_stack_air_1_0">
                                                                                                                                Non-Stackable
                                                                                                                            </label>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div class="form-field file-input cargo-doc">
                                                                                                                <input
                                                                                                                    type="file"
                                                                                                                    name="file-input"
                                                                                                                    id="file-input"
                                                                                                                    class="file-input__input"
                                                                                                                    multiple
                                                                                                                    accept=".png, .jpg, .jpeg, .doc, .docx, .pdf"
                                                                                                                />
                                                                                                                <label class="file-input__label" for="file-input">
                                                                                                                    <svg
                                                                                                                        aria-hidden="true"
                                                                                                                        focusable="false"
                                                                                                                        data-prefix="fas"
                                                                                                                        data-icon="upload"
                                                                                                                        class="svg-inline--fa fa-upload fa-w-16"
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

                                                                                                            <div class="cargo-container-type">
                                                                                                                <div class="cargo-type-content">
                                                                                                                    <div id="type_air" class="fk-containerType fk-fr">
                                                                                                                        <div class="fk-cargo-detail">
                                                                                                                            <div class="fk-cargo-choice dimension_wrap">
                                                                                                                                <h5>Dimensions in</h5>
                                                                                                                                <div class="form-radio">
                                                                                                                                    <div class="form-check dimension-check">
                                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                                            name="cargo_air_dimension"
                                                                                                                                            id="cargo_air_dimension_0_0"
                                                                                                                                            value="m"
                                                                                                                                            checked>
                                                                                                                                            <label class="form-check-label"
                                                                                                                                                for="cargo_air_dimension_0_0">
                                                                                                                                                M
                                                                                                                                            </label>
                                                                                                                                    </div>
                                                                                                                                    <div class="form-check dimension-check">
                                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                                            name="cargo_air_dimension"
                                                                                                                                            id="cargo_air_dimension_1_0"
                                                                                                                                            value="cm">
                                                                                                                                            <label class="form-check-label"
                                                                                                                                                for="cargo_air_dimension_1_0">
                                                                                                                                                CM
                                                                                                                                            </label>
                                                                                                                                    </div>
                                                                                                                                    <div class="form-check dimension-check">
                                                                                                                                        <input class="form-check-input" type="radio"
                                                                                                                                            name="cargo_air_dimension"
                                                                                                                                            id="cargo_air_dimension_2_0"
                                                                                                                                            value="in">
                                                                                                                                            <label class="form-check-label"
                                                                                                                                                for="cargo_air_dimension_2_0">
                                                                                                                                                IN
                                                                                                                                            </label>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="fk-cargo-detail fk-detail-wrap fk-product-detail">
                                                                                                                            <div class="fk-cargo-container-wrap fk-detail-container">
                                                                                                                                <div class="fk-cargo-container fk-cargo-container-multi fk-clone">
                                                                                                                                    <h4>Product</h4>
                                                                                                                                    <div class="fk-cargo-container-inner">
                                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                                            <h3 class="title">Length <span>(m)</span></h3>
                                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                                    class="form-control" />
                                                                                                                                                <label>Length</label>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                                            <h3 class="title">Width <span>(m)</span></h3>
                                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                                    class="form-control" />
                                                                                                                                                <label>Width</label>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="form-field-wrap fk-product-scale">
                                                                                                                                            <h3 class="title">Height <span>(m)</span></h3>
                                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                                    class="form-control" />
                                                                                                                                                <label>Height</label>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="form-field-wrap">
                                                                                                                                            <h3 class="title">Weight <span>(kg)</span></h3>
                                                                                                                                            <div class="form-field material-textfield">
                                                                                                                                                <input type="number" placeholder=" "
                                                                                                                                                    class="form-control" />
                                                                                                                                                <label>Weight</label>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="delete-clone">
                                                                                                                                            <i class="far fa-trash-alt"></i>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div class="form-field-wrap">
                                                                                                                                        <h3 class="title">Count</h3>
                                                                                                                                        <div class="quantity-field">
                                                                                                                                            <img class="sub"
                                                                                                                                                src="./assets/images/svg/sub.svg"
                                                                                                                                                alt="sub">
                                                                                                                                                <input type="number" value="0">
                                                                                                                                                    <img class="add"
                                                                                                                                                        src="./assets/images/svg/add.svg"
                                                                                                                                                        alt="add">
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div class="fk-cargo-container-btn">
                                                                                                                                        <button type="button" class="btn btn-default btn-cargo btn-clone">Add Product</button>
                                                                                                                                        <button type="button" class="btn btn-default btn-cargo">Add</button>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div class="cargo-remark">
                                                                                                                        <div class="form-field-wrap">
                                                                                                                            <h3 class="title">Remark</h3>
                                                                                                                            <div class="form-field single-field material-textfield-textarea">
                                                                                                                                <textarea id="cargo_msg" name="cargo_msg" placeholder=" " class="form-control" rows="8" cols="50"></textarea>
                                                                                                                                <label>Message</label>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <button type="submit" class="btn btn-default btn-booking" id="btn-air-booking">Get Rates</button>
                                                                                                            </form>
                                                                                                        </div>
                                                                                                    </div>
                                                                                            </div>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="shell-footer">
                                                                                    <div class="shell-copy-right">&copy; 2021 Freight Kare. All rights reserved</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 mob-menu-wrapper">
                                                                            <ul class="nav-menu">
                                                                                <li class="nav-menuList nav-menuList-active">
                                                                                    <a href="./index.html">
                                                                                        <span>Home</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li class="nav-menuList">
                                                                                    <a href="./aboutus.html">
                                                                                        <span>About us</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li class="nav-menuList">
                                                                                    <a href="./contact.html">
                                                                                        <span>Contact</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li class="nav-menuList">
                                                                                    <a href="./booking.html">
                                                                                        <span>Booking</span>
                                                                                    </a>
                                                                                </li>
                                                                                <li class="nav-menuList">
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