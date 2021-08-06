import React, {Component, createContext} from 'react';
import theContext from './accessContext'

class MainProvider extends Component {

  state = {
    showPostPopUp: false,
    currentGroup: ''
  }

  render() {
    return (
      <theContext.Provider value={{
        data: {...this.state},
        action: {
          openPopUp: () => this.setState((prevState)=>({showPostPopUp: true})),
          closePopUp: () => this.setState((prevState)=>({showPostPopUp: false})),
          currentGroupSet: (str) => this.setState((prevState)=>({currentGroup: str}))
        }
      }}>
        {this.props.children}
      </theContext.Provider>
    )
  }
}

export default MainProvider