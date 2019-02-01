import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textfit from 'react-textfit'
import posed from 'react-pose'
import ReactLoading from 'react-loading'
import './Styles.css'

const TextContainer = posed.div({
  hoverable: false,
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
  hoverable: false,
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

class LoadingScreen extends Component {

  state = {
    currentAnimationState: 0
  }

  render() {
    return (
      <div>
        <TextContainer className='main-menu-l1' style={{ color: this.props.textColor }}><Textfit mode='single'
                                                                                                 forceSingleModeWidth={false}>
          {this.props.showLoading &&
          <ReactLoading type='balls' color={this.props.textColor} className='loadingbar' width='10vw' />}
        </Textfit></TextContainer>
        <TextContainer className='main-menu-l1' style={{ color: this.props.textColor }}><Textfit mode='single'
                                                                                                 forceSingleModeWidth={false}>
          <b>{this.props.biggerText}</b>
        </Textfit></TextContainer>
        <TextContainer className='main-menu-l1' style={{ color: this.props.textColor }}><Textfit mode='single'
                                                                                                 forceSingleModeWidth={false}>
          {this.props.smallerText}
        </Textfit></TextContainer>
      </div>
    );
  }
}

LoadingScreen.propTypes = {
  showLoading: PropTypes.string,
  biggerText: PropTypes.string,
  smallerText: PropTypes.string,
  textColor: PropTypes.string
};

export default React.forwardRef((props, innerRef) => <LoadingScreen ref={innerRef} {...props} />);