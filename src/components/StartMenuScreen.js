import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit'
import posed from 'react-pose'
import './Styles.css'

const StartMenuScreenContainer = posed.div({
  enter: {
    opacity: 0,
    scale: 0.8,
    y: 400
  },
  exit: {
    opacity: 1,
    scale: 1.0,
    y: 0,
    transition: { scale: { type: 'spring', stiffness: 300, damping: 15, duration: 500 } }
  }
})

const MainMenuText = posed.div({
  hoverable: true,
  init: {
    // color: '#ffffff',
    scale: 1,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  },
  hover: {
    // color: '#00b975',
    scale: 1.2,
    transition: { scale: { type: 'spring', stiffness: 500, damping: 15, duration: 300 } }
  }

})

const MainMenuButton = posed.div({
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

class StartMenuScreen extends Component {
  render() {
    return (
      <StartMenuScreenContainer className='main-menu-container' key='start-menu-container'>
        <MainMenuText key='main-menu-text-1' className='main-menu-l1'><Textfit
          mode='single'
          forceSingleModeWidth={false}>
          <b>Hello,</b>
        </Textfit></MainMenuText>
        <MainMenuText key='main-menu-text-2' className='main-menu-l1'><Textfit
          mode='single'
          forceSingleModeWidth={false}>
          How's your dog knowledge?
        </Textfit></MainMenuText>
        <MainMenuButton key='main-menu-button-1' className='main-menu-l2'>START GAME</MainMenuButton>
      </StartMenuScreenContainer>
    );
  }
}

StartMenuScreen.propTypes = {};

export default StartMenuScreen;