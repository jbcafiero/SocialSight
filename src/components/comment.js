import React, {useState} from 'react'
import '.././App.css'
import database from '.././database.js'

export default function Comment(props) {

    const [content, setContent] = useState('')

    const triggerTrigger = () => {
        if(!props.commenting) {
            props.trigger()
        }
        else {
            props.createPost(content, 'OP')
            props.trigger()
            setContent('')
        }
    }

    return (
        <div>
            <div className="expandingBar" style={{paddingBottom: '35px', width: !props.commenting ? 'calc(50% + 45px)':'100%'}}>
                <button onClick={props.trigger} style={{
                    display: props.commenting ? 'block' : 'none',
                    float: props.commenting ? 'left' : 'right'
                }} className="commentB">Cancle</button>
                <button onClick={triggerTrigger} style={{
                    display: props.commenting ? 'block' : 'block',
                    float: props.commenting ? 'right' : 'right'
                }} className="commentB">Comment</button>
            </div>
            <div style={{margin: props.commenting ? '20px 0 20px 0' : '0px'}}>
                <textarea value={content} onChange={(e)=>{
                    setContent(e.target.value)
                }} className='commentBox' style={{width: props.commenting ? 'calc(100% - 30px)' : '0px', height: props.commenting ? '200px' : '0px',
                margin: '0px', opacity: props.commenting ? '1' : '0', resize: 'none', borderRadius: '3px',
                cursor:  props.commenting ? 'auto' : 'default', padding: props.commenting ? '15px' : '0px'}}></textarea>
            </div>
        </div>
    )
}
