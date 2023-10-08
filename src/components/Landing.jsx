import React, { useEffect } from 'react'
import { GetContext } from '../App'
import { downloadIcon, dummyProfile, editIcon, passport, worldMap } from '../assets'


const Landing = () => {
    const { data, camera, handleCameraMode } = GetContext();

    useEffect(() => {
        camera?.getVideoTracks().forEach(element => {
            if (element.enabled) {
                element.stop()
            }
        });
    }, [camera])

    return (
        <div className='passport relative'>
            <img src={passport} alt="passport" width={"172px"} />
            <div className='passport_card'>
                <div className='passport_card-inner'>
                    <div className="passport-upper flex">
                        <div className='relative'>
                            {data.img ?
                                <img src={data.img} alt="profile-pic" width="120px" height={"130px"} className="profile-pic" /> :
                                <img src={dummyProfile} alt="profile-pic" width="120px" height={"130px"} />}
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
            <a href={data.img} download={"imageName"} className='btn-download flex align-center gap-10'>
                {/* <button className='btn-download flex align-center gap-10'> */}
                <img src={downloadIcon} alt="download-icon" height={"20px"} />
                <span>Download</span>
                {/* </button> */}
            </a>
        </div>
    )
}

export default Landing


