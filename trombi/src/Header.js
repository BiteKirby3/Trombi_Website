import React from "react";

function Header() {
    return (
        <div>
            <img className="logo" src={process.env.PUBLIC_URL + "/utc.jpg"} alt="mypic" float="center"/>
            <h1>Trombinoscope GI</h1>
        </div>
    );
}

export default Header;