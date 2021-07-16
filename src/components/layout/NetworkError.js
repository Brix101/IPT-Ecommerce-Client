import React from 'react'

const NetworkError =({content}) =>{
    return (
        <div className="loading">
        <div className="error-h1">500</div>
        <div className="error-h2">
            <h3>Server {content} :(</h3>
        </div>
        <div className="gears">
          <div className="gear one">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="gear two">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="gear three">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    )
}

export default NetworkError
