import React, { Component } from 'react';
import posed from 'react-pose'
import Textfit from 'react-textfit'
import './Styles.css'

const TextContainer = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  },
  hover: {
    scale: 1.2,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  }
})

const TextButton = posed.div({
  hoverable: true,
  init: {
    color: '#ffffff',
    scale: 1,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  },
  hover: {
    color: '#A8EB12',
    scale: 1.8,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  }

})

class StartMenuView extends Component {

  startGame = () => {
    this.props.uiHandler()
  }

  render() {
    return (
      <div>
        <TextContainer className='main-menu-l1'><Textfit mode='single' forceSingleModeWidth={false} color='#ffffff'>
          <b>Hello,</b>
        </Textfit></TextContainer>
        <TextContainer className='main-menu-l1'><Textfit mode='single' forceSingleModeWidth={false} color='#ffffff'>
          How's your dog knowledge?
        </Textfit></TextContainer>
        <TextButton className='main-menu-l2' onClick={this.startGame}>Start and find out</TextButton>
      </div>
    )
  }
}

StartMenuView.propTypes = {};

// export default StartMenuView;
export default React.forwardRef((props, innerRef) => <StartMenuView ref={innerRef} {...props} />);