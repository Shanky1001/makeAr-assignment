import React from 'react'
import { GetContext } from '../App'
import { downloadIcon, dummyProfile, editIcon, passport, worldMap } from '../assets'


const Landing = () => {
    const { data, handleCameraMode } = GetContext()
    return (
        <div className='passport relative'>
            <img src={passport} alt="passport" width={"172px"} />
            <div className='passport_card'>
                <div className='passport_card-inner'>
                    <div className="passport-upper flex">
                        <div className='relative'>
                            <img src={data.img || dummyProfile} alt="profile-pic" />
                            <img src={editIcon} alt="edit-button" className='cta-edit' onClick={handleCameraMode} />
                        </div>
                        <div className='passport-details'>
                            <h5>Name</h5>
                            <h3>{data.name || "Name"}</h3>
                            <p>
                                I’m ready to discover the world !
                            </p>
                        </div>
                    </div>
                </div>
                <div className="passport-lower">
                    <div className='relative'>
                        <h6>Continents Explored</h6>
                        <img src={worldMap} alt="world-map" width={"100%"} height={"100%"} />
                    </div>
                </div>
            </div>
            <button className='btn-download flex align-center gap-10'>
                <img src={downloadIcon} alt="download-icon" height={"20px"} />
                <span>Download</span>
            </button>
        </div>
    )
}

export default Landing


