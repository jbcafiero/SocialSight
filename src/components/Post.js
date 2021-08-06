import React from 'react';
import '.././App.css'

  class Post extends React.Component {
    constructor() {
      super();
    }

    executCreation = () => {
      this.props.postInfo(this.titleIn.value, this.infoIn.value)
    }

    componentDidMount() {
    }

    render() {
      return(
        <div className="postBackground">
          <div className="parentContainer">
            <h2 style={{bold: 'none', color: 'rgb(66, 66, 66)', fontSize: '40px', margin:'10px 0 0 0', textAlign: 'center'}}>
              Create Post</h2>
            <input type="text"
            placeholder="Title"
            style={{height: '30px', fontSize: '25px'}}
            className="basicFloatLeft"
            ref={(titleH) => {this.titleIn = titleH}}></input>
            <textarea rows="4" placeholder="Body"
            style={{resize: 'none', height: '90px', fontSize: '15px'}}
            className="basicFloatLeft"
            ref={(infoH) => {this.infoIn = infoH}}></textarea>
            <button className="addButton"
            onClick={this.executCreation} >
            New Post</button>
            <button className="cancelButton"
            onClick={this.props.exitPost} >Cancel</button>
          </div>
        </div>
      );
    }
  }

  export default Post;
