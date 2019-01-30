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



class StartMenuScreen extends Component {
  render() {
    return (
      <StartMenuScreenContainer className='main-menu-container' key='start-menu-container'>

      </StartMenuScreenContainer>
    );
  }
}

StartMenuScreen.propTypes = {};

const ComponentWithFwdedRefs = React.forwardRef((props, ref) => (
  <StartMenuScreen ref={ref} {...props} />
));

const PosedComponent = posed(ComponentWithFwdedRefs)({
  draggable: true
});


// export default StartMenuScreen;
export default React.forwardRef((props, innerRef) => <StartMenuScreen {...props} ref={innerRef} />)
