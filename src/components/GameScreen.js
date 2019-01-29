import React from 'react';
import PropTypes from 'prop-types';
import './GameScreen.css'

const GameScreen = props => {
  return (
    <div className='gameScreen'>
      <div className='game-area'>
        <div className='img-container-box'>
          <img className='question-img' src='https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2018/2-dog.jpg'
               alt='' />
        </div>
        <div className='question-text'>What breed is the dog on the picture?</div>
        <div className='answers-container'>
          <div className='option'>Alpaca</div>
          <div className='option'>Humaracha</div>
          <div className='option'>Bullodogo</div>
        </div>
      </div>
    </div>
  );
};

GameScreen.propTypes = {};

export default GameScreen;