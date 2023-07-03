import React from 'react';

import api_logo from '../../../../logos/api.png'

export default function Api() {
  return (
    <div className="api-container">
      <div className="api-background"></div>
      <div className="api-segments">
        <div className="api-logo">
          <img src={api_logo} alt='Api Logo' />
        </div>
        <div className="api-text">
          <h2>Api</h2>
          <p>
            Out API, unlock the potential of your investment
            strategies with our powerful Stock API. Gain access to the
            fundamental, technical, and economic data that fuels informed decision-making.
            Seamlessly integrate our API into your systems
            and elevate your trading and investing experience.
            Start harnessing the power of data today to maximize your investment success.
          </p>
          <div className='api-button'>
            Get Started
          </div>
        </div>
      </div>
    </div>
  );
}
