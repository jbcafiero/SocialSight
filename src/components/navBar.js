import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import logo from '.././images/ss-logo+name.png'
import PopUp from './popUpCreate.js';
import lines from '.././images/line-backdrop-blue.png'
import Home from './home.js';
import '.././App.css'

const mainBarS = {

}

const navButtons = {
    gridColumnStart: '3',
    gridColumnEnd: '3',
}

const Navigation = (props) => {

    const [amountOfScroll, setAmountOfScroll] = useState(0);
    //document.documentElement.scrollTop
    useEffect(() => {
        window.addEventListener('scroll', () => setAmountOfScroll(document.documentElement.scrollTop))
    })

    return (
        <React.Fragment>
        <div style={{width: '100vw', height: '75px', position: 'fixed', display: 'flex', justifyContent: 'center',
        background: `rgba(0,0,0,${amountOfScroll<250 ? amountOfScroll/250:1})`}}>
            <div className="navBar" style={mainBarS}>
                <div style={{gridColumnStart: '1', gridColumnEnd: '1',}}>
                    <Link to='/'><img src={logo} style={{height: '75px', marginTop: '0'}}/></Link>
                </div>
                <div style={{gridColumn: '2'}}>
                    
                </div>
                <div style={{...navButtons, display: 'flex', alignItems: 'center', justifySelf: 'end'}}>
                    <Link className="navButtons" to='/groups' style={{border: 'none', fontSize: '20px', marginRight: '50px'}}>Groups</Link>
                    <Link className="navButtons" to='/groups/main-board' style={{border: 'none', fontSize: '20px', }}>Main Board</Link>

                </div>
            </div>
        </div>
        <div style={{height: '80px'}}>
            
        </div>
        </React.Fragment>
    )
}

export default Navigation
