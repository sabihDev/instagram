import React from 'react'
import './Story.css'

const Story = (props) => {
  return (
    <>
        <div className="story">
            <img src={props.image} alt="" />
            <span>{props.name}</span>
        </div>  
    </>
  )
}

export default Story