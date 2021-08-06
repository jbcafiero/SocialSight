import React, {useState, useEffect, useContext} from 'react';
import '.././App.css'
import PostElement from './postElement'
import database from '.././database.js'
import theContext from '.././accessContext'

const List = ({props, match}) => {

  const context = useContext(theContext)

  const [posts, setPosts] = useState({posts: []})
  
  useEffect(()=>{
    context.action.currentGroupSet(match.params.name)
    database.collection("posts").where('groupBelong','==',`${match.params.name}`).
    onSnapshot((snap) => {
      let assembleData = []
      async function assmbler() {
        snap.docChanges().forEach((item) => {
          assembleData.push({
            username: item.doc.data().username,
            title: item.doc.data().title,
            info: item.doc.data().body,
            reputation: item.doc.data().reputation,
            groupBelong: item.doc.data().groupBelong,
            key: item.doc.id
          })
        })
        return (assembleData)
      }
      assmbler().then((data) => {
        setPosts(() => {
          let holdData = posts.posts;
          data.map((obj, index) => {
            let keyInPrevState = false;
           posts.posts.map((post, indexChange) => {
              if(obj.key === post.key) {
                holdData[indexChange] = obj;
                keyInPrevState = true
              }
            })
            if (!keyInPrevState) {
              holdData.push({...obj})
            }
          })
          console.log(holdData)
          return ({posts: holdData})
        })
      })
    })
  },[])

  const capitalize = (str) => {
    let spaceIndexes = [0]
    let currentIndex=0;
    let stringToReturn = str

    while (true) {
        const result = stringToReturn.indexOf("-", currentIndex+1)
        if(result==-1) {
            break
        }
        spaceIndexes.push(result)
        currentIndex = result
    }
    spaceIndexes.forEach((index) => {
        //index==0?0:index+1
        stringToReturn = stringToReturn.substring(0, index==0?0:index+1) +
        stringToReturn.charAt(index==0?0:index+1).toUpperCase() +
        stringToReturn.substring((index==0?0:index+1)+1)
    })
    return stringToReturn.replace(/-+/g, ' ')
  }

  const postsRef = database.collection('posts')
  const changeReputation = (ID, type, action) => {
    posts.posts.map((target, index) => {
      if (target.key === ID) {
        const affectOnRep = (type*action)
        postsRef.doc(ID).get().then((doc) => (doc.data().reputation)).
        then((rep) => {
          postsRef.doc(ID).update({
            reputation: rep + affectOnRep
          })
        });
      }
    })
  }

  const holdList = posts.posts.map((post, i) => {
    // console.log(post.username)
    return(<PostElement
            username={post.username}
            title={post.title}
            info={post.info}
            id={post.key}
            isDisplayingOpt={post.isDisplayingOptions}
            changeReputation={changeReputation}
            reputation={post.reputation}
            groupBelong={post.groupBelong}
            />
            
            )});
  return(
    <div>
      <div style={{width: '100%', fontSize:'50px',
      color:'#c6acff', textAlign:'center', fontWeight: 'bold'}}>
      {capitalize(match.params.name)}
      <button className="navButtons" 
                    onClick={context.action.openPopUp} 
                    style={{width: '37px', height: '37px', margin: '0 0 20px 20px'}}>+</button>
      </div>
      
      <div className="postsContain">
      {holdList}
      </div>
    </div>
  )
}

  export default List;
