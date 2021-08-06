import React, {useState, useEffect} from 'react'
import selectedArrow from '.././images/selected-arrow.png'
import unSelectedArrow from '.././images/unselected-arrow.png'
import replyIcon from '.././images/reply-icon-black.png'
import database from '.././database.js'



export default function ReplyVotes(props) {

    const [rep, setRep] = useState()
    const [opinion, setOpinion] = useState({like: false, dislike: false})

    useEffect(()=>{
        database.collection('posts').doc(props.id).get().then((doc)=>{
            return(doc.data().reputation)
        }).then((data)=>{setRep(data)})
    },[])

    const like = () => {
        let numberOffset;
        let opinionDisp;
        if(!opinion.like){
            if(!opinion.dislike) {
                numberOffset = 1
                opinionDisp = {like: true, dislike: false}
            }
            else {
                numberOffset = 2;
                opinionDisp = {like: true, dislike: false}
            }
        }
        else if(opinion.like){
            numberOffset = -1;
            opinionDisp = {like: false, dislike: false}
        }
        console.log(props.id)
        database.collection('posts').doc(props.id).get().then((doc)=>{
            return(doc.data().reputation + numberOffset)
        }).then((newRep)=>{setRep(newRep); setOpinion(opinionDisp);
            database.collection('posts').doc(props.id).update({
                reputation: newRep
            })
        })
    }
    const dislike = () => {
        let numberOffset;
        let opinionDisp;
        if(!opinion.dislike){
            if(!opinion.like) {
                numberOffset = -1
                opinionDisp = {like: false, dislike: true}
            }
            else {
                numberOffset = -2;
                opinionDisp = {like: false, dislike: true}
            }
        }
        else if(opinion.dislike){
            numberOffset = 1;
            opinionDisp = {like: false, dislike: false}
        }
        database.collection('posts').doc(props.id).get().then((doc)=>{
            return(doc.data().reputation + numberOffset)
        }).then((newRep)=>{setRep(newRep); setOpinion(opinionDisp);
            database.collection('posts').doc(props.id).update({
                reputation: newRep
            })
        })
    }

    return (
        <>

        <div style={{ color: 'black', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div onClick={like} style={{content: opinion.like ? `url(${selectedArrow})` : `url(${unSelectedArrow})`, height: '35px'}}></div>
            <div>{rep}</div>
            <div onClick={dislike} style={{content: opinion.dislike ? `url(${selectedArrow})` : `url(${unSelectedArrow})`,
             height: '35px', transform: 'rotate(180deg)'}}></div>
        </div>
        </>
    )
}
