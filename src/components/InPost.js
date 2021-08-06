import React, {useEffect, useState} from 'react'
import database from '.././database.js'
import '.././App.css'
import ReplyVotes from '.././components/replyVotes.js'
import PostOptBar from '.././components/postOptBar.js'
import Comment from '.././components/comment.js'
import replyIcon from '.././images/reply-icon-purple-wire.png'
import CommentThread from '.././components/commentThread'

import { async } from 'q';
import { identifier } from '@babel/types';

const InPost = ({match, params}) => {

    const [post, setPost] = useState({})
    const [replies, setReplies] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [isCommenting, setIsCommenting] = useState(false)


    useEffect(()=>{

        database.collection('posts').doc(match.params.postID).get().then((doc)=>{
            return ({
                username: doc.data().username,
                title: doc.data().title,
                body: doc.data().body,
                reputation: doc.data().reputation
            })

        }).then(data=>{
            setPost(data)
            setIsMounted(true)
        }).catch(()=>{      
            setPost('error');
            setIsMounted(true);
        })
        
        database.collection("replies").where('postBelong','==',match.params.postID).
        get().then((docs) => {
          let assembleData = []
            docs.forEach((doc) => {
              assembleData.push({
                username: doc.data().username,
                info: doc.data().body,
                reputation: doc.data().reputation,
                replyTo: doc.data().replyTo,
                layer: doc.data().layer,
                key: doc.id
              })
            })
            return (assembleData)
        }).then((data)=>{
            setReplies(data)
        }).catch(()=>{      
            setPost('error');
        })
    },[])

    const createComment = (content, identifier) => {
        const newData = {
            username: 'anonymous',
            body: content,
            reputation: 0,
            postBelong: match.params.postID,
            replyTo: identifier
        }
        database.collection('replies').add(newData).then(()=>{
            database.collection("replies").where('postBelong','==',match.params.postID).
            get().then((docs) => {
              let assembleData = []
                docs.forEach((doc) => {
                  assembleData.push({
                    username: doc.data().username,
                    info: doc.data().body,
                    reputation: doc.data().reputation,
                    replyTo: doc.data().replyTo,
                    layer: doc.data().layer,
                    key: doc.id
                  })
                })
                return (assembleData)
            }).then((data)=>{
                setReplies(data)
            }).catch(()=>{      
                setPost('error');
            })
        })
    }

    const constructHeirachy = (OP, replies, ind, self) => {
        let indent = ind+1;
        let hackOfMap = []
        if(indent!=0) {
            for(var i = 0; i < indent; i++) {
                hackOfMap.push('a')
            }
        }
        return (
            <>      
            {replies.filter((rep)=>rep.replyTo===OP).map((reply)=> (
                <div>
                    <div style={{display: 'grid', gridTemplateRows: `auto auto`, gridTemplateColumns: `${100*indent}px 100px auto`, minHeight: '100px'}}>
                        <div className="extend" style={{margin: '0px', display: 'flex', flexDirection:'row'}}>
                            {hackOfMap.map(()=>{
                                return (
                                    <div style={{float: 'left', width: '100px', height: '100%', display: 'block', textAlign: 'center',}}>
                                        <div style={{height: '100%', width: '2px', margin: '0 49px 0 49px', background: '#c6acff'}}>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{gridColumnStart: '2', gridColumnEnd: '2', gridRow: '1', borderRight: 'none'}}>
                            <ReplyVotes
                            username={reply.username}
                            reputation={reply.reputation}
                            id={reply.key}
                            />
                        </div>
                        <div style={{ gridColumn: '3', gridRow: '1', width: '100%', display: 'flex', alignItems: 'center'}}>
                            <p style={{padding: '10px', gridRow:'1'}}>{reply.info}</p>
                        </div>

                        <div style={{gridColumn: '2', gridRow: '2',float: 'left', width: '100px', height: '100%', display: 'block', textAlign: 'center',}}>
                                <div style={{height: '100%', width: '2px', margin: '0 49px 0 49px', background: '#c6acff'}}>
                                </div>
                        </div>
                        <div className="commentArea" style={{}}>
                            <CommentThread
                            id={reply.key}
                            createPost={createComment}
                            />
                        </div>
                    </div>
                    {self(reply.key, replies, indent, self)}
                </div>
            ))}
            </>
        )
    }

    const setTheCond = () => {
        setIsCommenting(!isCommenting)
    }


    const postIfIdWorks = (condition) => {
        const trueContition = condition=='error' ? false : true
        if(trueContition) {
            return (
                <div className="applyTrans" style={{color: 'black', opacity: isMounted ? '1' : '0'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '70%', margin: '0 15% 0 15%',
                    alignItems: 'center', background: '#c6acff', borderRadius: '3px'}}>
                    <div style={{borderBottom: '2px solid black', margin:'0px', padding: '0px'}}>
                        <h3 style={{margin: '10px 0 10px 0', border: 'none', padding: '0px', fontWeight: 'bold', fontSize: '33px', textAlign: 'center'}}>
                        {post!='error' ? post.title : ''}</h3>
                        <p style={{margin: '0px 0 5px 0'}}>posted by {post.username}</p>
                    </div>
                    <div>
                        <p style={{margin: '0', padding: '25px'}}>
                            {post!='error' ? post.body : ''}
                        </p>
                     </div>
                     <div className="bottomOptionBar">
                        <PostOptBar
                        id={match.params.postID}
                        reputation={post.reputation}
                        />
                     </div>
                </div>
                <div style={{borderBottom: '2px solid #c6acff', width: '70%', margin: '0 15% 0 15%', height: '25px', marginBottom: '25px'}}>
                </div>
                <div style={{textAlign: 'center', width: '70%', minHeight: '50', margin: '0 15% 0 15%'}}>
                    <Comment 
                    commenting={isCommenting}
                    trigger={setTheCond}
                    createPost={createComment}
                    />
                </div>
                <div style={{width: '70%', margin: '0 15% 0 15%'}}>          
                    <div style={{color: '#c6acff', width: '100%', background: 'black'}}>
                        {constructHeirachy("OP", replies, -1, constructHeirachy)}
                    </div>
                </div>
            </div>
            )
        }
        else {
            return (
                <div style={{color:'#c6acff', width: '100%', textAlign: 'center', margin: '25px 0 0 0',
                fontSizeZ:'20px'}}>
                    Invalid URL, post not found
                </div>
            )
        }
    }

    return (
        <div style={{color: 'white'}}>
            {postIfIdWorks(post)}
        </div>
    )
}

export default InPost
