import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import '.././App.css';
import theContext from '.././accessContext'
import database from '.././database.js'

const mainBox = {
    display: 'grid',
    width: '60vw',
    height: '50vh',
    gridTemplateRows: '1% 7% 7% 28% 7%',
    gridRowGap: '10%',
    alignContent: 'center',
    justifyContent: 'center',
}

const popUp = {
    position: 'fixed',
    zPostition: '100',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(120,120,120,0.5)'
}

const exit = {
    color: '#c6acff',
    fontSize: '30px',
    transform: 'rotate(45deg)',
    width: '15px',
    height: '30px',
    cursor: 'pointer'
}

const PopUp = (props) => {

    const context = useContext(theContext)

    const [postData, setPostData] = useState({
        username: "",
        title: "",
        body: ""
    })

    const savePost = (userN, tit, bod) => {
        console.log(userN + tit + bod)
        database.collection("posts").add({
          username: userN!='' ? userN : 'anonymous',
          title: tit,
          body: bod,
          reputation: 0,
          groupBelong: context.data.currentGroup
        })
    }

    const usernameCapt = (e) => setPostData({...postData, username: e.target.value})
    const titleCapt = (e) => setPostData({...postData, title: e.target.value})
    const bodyCapt = (e) => setPostData({...postData, body: e.target.value})

    return (
        <div style={{...popUp, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{...mainBox, opacity: '1', background: 'black'}}>
                <div onClick={context.action.closePopUp} style={exit} >+</div>
                <input className='inputss' value={postData.username} onChange={usernameCapt} style={{width: '25vw', height: '100%', margin: '0 12.5vw'}} placeholder="userName"></input>
                <input className='inputss' value={postData.title} onChange={titleCapt}  style={{width: '50vw', height: '100%'}} placeholder="title"></input>
                <textarea className='inputss' value={postData.body} onChange={bodyCapt}  style={{width: '50vw', height: '100%', paddingTop: '15px'}} placeholder="body"></textarea>
                <button onClick={savePost.bind(null, postData.username, postData.title, postData.body)}
                className="postButton" style={{width: '12.5vw', height: '100%', margin: '0 18.75vw'}} >Post</button>
            </div>
        </div>
    )
}

export default PopUp;
