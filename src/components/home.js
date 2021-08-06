import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '.././images/ss-logo-final.png'
import bg from '.././images/line-backdrop-grid.png'
import '.././App.css';
import { basename } from 'path';
import LogUser from './logUser.js'

const mainCont = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateRows: '100vh 50vh',
    gridTemplateRows: 'auto',

}

const leftCont = {
    display: 'grid',
    gridTemplateRows: '2.5% 10% 10% 70% ',
    alignContent: 'center',
    justifyContent: 'center'
}
const rightCont = {

}

const heading = {
    display: 'flex',
    color: '#c6acff',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: '55px',
    fontWeight: '10px'
}
const graphic = {
    display: 'flex',
    background: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '250px',
}
const lowerArea = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
}
export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
            <div className="mainBG" style={{height: '100vh', width: '100vw', backgroundSize: 'auto 100%', backgroundPosition: 'center'}}>
                <div style={mainCont}>
                    <div style={leftCont}>
                        <div>

                        </div>
                        <div className='outline' style={heading}>
                            <p style={{margin: '0', padding: '0'}}>Social Site</p>
                        </div>
                        <div style={{...heading, alignItems: 'flexStart', justifyContent: 'center'}}>
                        <p className="outline" style={{fontWeight:'8px', fontSize: '28px', color: '#c6acff',}}>
                                The generic social newtork for the web.
                            </p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={logo} style={{marginLeft: '35px', width:'400px'}}/>
                        </div>
                    </div>
                    <div style={rightCont}>
                    </div>
                </div>
                <div style={{lowerArea}}>

                </div>
            </div>
            <div style={{...graphic}}>
                                    <p style={{color: '#c6acff', fontSize: '30px', width: '70%', textAlign: 'center'}}>
                                    The Internet Provides A Group For Everyone
                                    </p>
                                    <Link className="linkStart" to="/groups" style={{}}>View Groups</Link>
                        </div>
            <LogUser savePost={this.props.savePost}/>
            </React.Fragment>
        )
    }
}
