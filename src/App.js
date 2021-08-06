import React, {Component, createContext} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainProvider from './globalState.js'
import theContext from './accessContext'
// import Post from './components/Post.js';
import List from './components/List.js';
import Home from './components/home.js';
import PopUp from './components/popUpCreate.js';
import Navigation from './components/navBar.js';
import InPost from './components/InPost.js';
import './App.css';
import database from './database.js'
// import { async } from 'q';
import Groups from './components/groups.js'

const postsRef = database.collection("posts")

class App extends Component {

  constructor(props){
    super(props)
    // this.initialPosts = []

    // database.collection("posts").get().then((capture) => {
    //   capture.docs.forEach(doc => {this.initialPosts.push({
    //     username: doc.data().username,
    //     title: doc.data().title,
    //     info: doc.data().body,
    //     reputation: doc.data().reputation,
    //     key: doc.id
    //   })});
    // })

    this.state = {
      currentUser: 'none',
      creatingPost: true,
      posts: [],
      users: [
        {
          username: 'jacobcafiero',
          password: 'password',
          bio: 'this is random information about myself!!!',
          userID: 0
        }
      ],
      newKey: 1,
      newUserID: 0,
      showPopUp: false
    }
  }

  componentDidMount() {

    // database.collection("posts").get().then((capture) => {
    //   let assembleData = []
    //   capture.docs.forEach(doc => {assembleData.push({
    //     username: doc.data().username,
    //     title: doc.data().title,
    //     info: doc.data().body,
    //     reputation: doc.data().reputation,
    //     key: doc.id
    //   })})
    //   return (assembleData)
    // }).then((data) => {this.setState({posts: data})})

  }

  renderPosts = () => {
    this.forceUpdate()
    clearInterval(this.access)
  }

  changePostingState = () => {
    this.setState({
      creatingPost: false
    });
  }

  removePop = () => {
    this.setState({showPopUp: false})
  }
  showPop = () => {
    this.setState({showPopUp: true})
  }

  showPopUpOrNot = (arg) => {
    if (arg) {
      return <PopUp popUpRemove={this.removePop}
                    savePost={this.postPost} />
    }
    return null
  }

  // checkForUpdates = () => {
  //   postsRef.onSnapshot({includeMetadataChanges: true}, (snap) => {
  //     let holdChanges = []
  //     snap.docChanges().forEach(item => {
  //       holdChanges.push({
  //         username: item.doc.data().username,
  //         title: item.doc.data().title,
  //         info: item.doc.data().body,
  //         reputation: item.doc.data().reputation,
  //         key: item.doc.id
  //       })
  //     });
  //     if (this.state.posts != holdChanges) {
  //       this.setState(prevState => ({posts: [...holdChanges]}))
  //     }
  //   });
  // }

  render() {
    return (
      <MainProvider>
        <Router>
          <theContext.Consumer>
            {context =>
                this.showPopUpOrNot(context.data.showPostPopUp)
            }
          </theContext.Consumer>
          <div>
            <Navigation showPopUp={this.showPop}/>
            <Route exact path="/" render={() => (
              <Home savePost={this.postPost}/>)}/>
              <Route path="/groups" exact render={() => (<Groups
              />)}/>
              <Route path="/groups/:name" exact component={List} />
              <Route path="/groups/:name/:postID" component={InPost} />
          </div>
        </Router>
      </MainProvider>
    );
  }
}

export default App;