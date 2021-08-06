import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import '.././App.css'
import OptionMenu from './optionMenu.js'
import arrowLogo from '.././images/arrow.png'
import arrowLogoSelect from '.././images/selected-arrow.png'
import openOpt from '.././images/options-logo.png'
import MainProvider from '.././globalState.js'
import theContext from '.././accessContext'

const defaultOpt = {
  textAlign: 'center',
  fontSize: '30px',
  display: 'none'
}

const titleS = {
  fontSize: '32px',
  color: 'black',
  gridColumn: '2',
  gridRow: '1',
  borderLeft: '2px solid black',
  display: 'flex',
  alignItems: 'center'
}
const infoS = {
  fontSize: '20px',
  color:'rgb(66, 66, 66)',
  borderTop: '2px solid black',
  padding: '20px',
  gridColumn: '2/span 1',
  gridRow: '2',
  borderLeft: '2px solid black',
}

const PostElement = (props) => {

  const context = useContext(theContext)

  const [isMounted, setIsMounted] = useState(false);
  const [userOpinion, setUserOpinion] = useState({like: false, dislike: false});

  useEffect(() => {
    setIsMounted(true)
  });

  const like = (id, callB) => {
    if (userOpinion.like) {
      setUserOpinion({like: false, dislike: false})
      callB(props.id, -1, 1)
    }
    else {
      setUserOpinion({like:true, dislike: false})
      if (userOpinion.dislike) callB(props.id, 1, 2)
      else callB(props.id, 1, 1)
    }
  }
  const dislike = (id, callB) => {
    if (userOpinion.dislike) {
      setUserOpinion({like: false, dislike: false})
      callB(props.id, 1, 1)
    }
    else {
      setUserOpinion({like:false, dislike: true})
      if (userOpinion.like) callB(props.id, -1, 2)
      else callB(props.id, -1, 1)
    }
  }

  return(
    //onClick={props.displayOptions.bind(this, props.id)}
    <div className="postObj" style={isMounted==true ? {opacity: '1'} : {}} >
      <Link to={`/groups/${props.groupBelong}/${props.id}`} style={{height:'100%', width:'100%', textDecoration:'none', color:'black'}}>
        <div className="postTemplate">
          <div style={{gridColumn: '1', gridRow: '1', justifySelf: 'center', alignSelf: 'center'}}>
            <div style={{whiteSpace: 'noWrap', width: '100%'}}>
              <div style={{}}>
                {props.username}
              </div>
            </div>
          </div>
          <div style={{gridColumn: '1', gridRow: '2', justifySelf: 'center',}}>
            <div onClick={like.bind(null, props.id, props.changeReputation)} style={{content: userOpinion.like ? `url(${arrowLogoSelect})` : `url(${arrowLogo})`,
            width: '50px', height: '50px'}}>
            </div>
            <div style={{width: '50px', textAlign: 'center'}}>
              {props.reputation}
            </div>
            <div onClick={dislike.bind(null, props.id, props.changeReputation)} style={{content: userOpinion.dislike ? `url(${arrowLogoSelect})` : `url(${arrowLogo})` ,
            width: '50px', height: '50px',
              transform: 'rotate(180deg)'}}>

            </div>
          </div>
          <div style={titleS}>
            <h1 style={{margin: '0 0 0 20px', fontWeight: 'normal', fontSize: '33px'}}>
              {props.title}
            </h1>
          </div>
          <div style={{content: `url(${openOpt})`, width: '20px', height: '20px', gridColumn: '3', gridRow: '1', alignSelf: 'center'}}>
            {/* ... Image */}
            </div>
          <div style={infoS}>
          {props.info}
          </div>
        </div>
      </Link>
    </div>
  )

}

export default PostElement;
