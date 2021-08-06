import React, {useState} from 'react'
import '.././App.css'
import replyIcon from '.././images/reply-icon-purple-wire.png'

export default function Comment(props) {

    const [content, setContent] = useState('')
    const [isCommenting, setIsCommenting] = useState(false)

    const triggerTrigger = () => {
        if(!isCommenting) {
            setIsCommenting(!isCommenting)
        }
        else {
            props.createPost(content, props.id)
            setIsCommenting(!isCommenting)
            setContent('')
        }
    }

    return (
        <div>
            <div style={{paddingBottom: isCommenting ? '35px' : '0px'}}>
            <button onClick={triggerTrigger} style={{
                    display: isCommenting ? 'none' : 'block',
                    float: 'left',
                    border: 'none',
                    transform: 'scale(0.7)',
                    padding: 'none'
                }} className="commentB">Comment</button>
                <button onClick={()=>{setIsCommenting(!isCommenting)}} style={{
                    display: isCommenting ? 'block' : 'none',
                    float: isCommenting ? 'left' : 'left'
                }} className="commentB">Cancle</button>
                <button onClick={triggerTrigger} style={{
                    display: isCommenting ? 'block' : 'none',
                    float: isCommenting ? 'right' : 'right'
                }} className="commentB">Comment</button>
            </div>
            <div style={{margin: isCommenting ? '20px 0 20px 0' : '0px'}}>
                <textarea value={content} onChange={(e)=>{
                    setContent(e.target.value)
                }} className='commentBox' style={{width: isCommenting ? 'calc(100% - 30px)' : '0px', height: isCommenting ? '100px' : '0px',
                margin: '0px', opacity: isCommenting ? '1' : '0', resize: 'none', borderRadius: '3px',
                cursor:  isCommenting ? 'auto' : 'default', padding: isCommenting ? '15px' : '0px'}}></textarea>
            </div>
        </div>
    )
}
