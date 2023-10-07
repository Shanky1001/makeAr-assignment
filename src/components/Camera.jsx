import React from 'react'
import { GetContext } from '../App'
import { closeBtn, retakeBtn, shutterBtn } from '../assets'

const Camera = () => {
    const { data, handleCameraMode } = GetContext();
    return (
        <div className='page-camera'>
            <div className='camera relative'>
                <div className='stream'>

                </div>
                {data.img ? <img src={retakeBtn} alt="retake-button" className='cta-click' /> : <img src={shutterBtn} alt="shutter-button" className='cta-click' />}
                <img src={closeBtn} alt="close-button" className='cta-close' onClick={handleCameraMode} />
            </div>
            <div className='actions'>
                <input type="text" placeholder='Enter your name' />
                <p></p>
                <button className='btn btn-save'>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Camera