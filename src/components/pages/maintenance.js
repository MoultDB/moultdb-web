import React from 'react'
import ChangePageTitle from "../../common/change-page-title";
import './maintenance.css';
import logo from "../../assets/images/logo.png";

function Maintenance() {

    return <main className={"container"}>
        <ChangePageTitle pageTitle="Maintenance page"/>
        <div className="row">
            <div className="col-8 offset-2 text-center">
                <h1>Under maintenance</h1>
            </div>
        </div>

        <div className={"row"}>
            <div className={"col-8 offset-2 justify-content-center text-center"}>
                <img src={logo} className={"maintenance-logo"} alt="MoultDB Logo"/>
                <p className={"mbr-bold"}>MoultDB is currently down for maintenance.</p>
                <p>Thanks for your patience.</p>
            </div>
        </div>
    </main>
}

export default Maintenance
