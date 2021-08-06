import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import '.././App.css';

const mainBox = {
    display: 'grid',
    width: '50vh',
    height: '100%',
    gridTemplateRows: '7% 7% 28% 7%',
    gridRowGap: '8%',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '20px',
}

const LogUser = (props) => {

    const [postData, setPostData] = useState({
        username: "",
        title: "",
        body: ""
    })

    const usernameCapt = (e) => setPostData({...postData, username: e.target.value})
    const titleCapt = (e) => setPostData({...postData, title: e.target.value})
    const bodyCapt = (e) => setPostData({...postData, body: e.target.value})

    return (
        <div idName="userPost" style={{backgroundColor: 'black', display: 'flex', justifyContent: 'center', height: '55vh'}}>
            <div style={mainBox}>
                <input className='inputss' value={postData.username} onChange={usernameCapt} style={{width: '25vh', height: '100%', margin: '0 12.5vh'}} placeholder="userName"></input>
                <input className='inputss' value={postData.title} onChange={titleCapt} style={{width: '50vh', height: '100%'}} placeholder="title"></input>
                <textarea className='inputss' value={postData.body} onChange={bodyCapt} style={{width: '50vh', height: '100%', paddingTop: '15px'}} placeholder="body"></textarea>
                <Link onClick={{}} className="postButton" to="/posts" style={{width: '15vh', height: '100%', margin: '0 17.5vh'}}>Create First Post</Link>
            </div>
        </div>
    )
}

export default LogUser;
