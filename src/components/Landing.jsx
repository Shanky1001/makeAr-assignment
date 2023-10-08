import React, { useEffect } from 'react'
import { useRef } from 'react';
import { GetContext } from '../App'
import { downloadIcon, dummyProfile, editIcon, passport, worldMap } from '../assets'
import { lockRegion, path } from '../constant';

const Landing = () => {
    const { data, camera, handleCameraMode } = GetContext();
    const mapRef = useRef()
    useEffect(() => {
        camera?.getVideoTracks().forEach(element => {
            if (element.enabled) {
                element.stop()
            }
        });
    }, [camera])

    const setLockAttribute = (newPath, val) => {
        newPath.setAttributeNS(null, "d", val.path)
        newPath.setAttributeNS(null, "fill", val.fill)
        newPath.setAttributeNS(null, "class", "lock")
        return newPath
    }

    const notLockAttribute = (newPath, val) => {
        newPath.setAttributeNS(null, "d", val.path)
        newPath.setAttributeNS(null, "fill", val.fill)
        return newPath
    }

    useEffect(() => {
        path.map((val, i) => {
            let newPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
            lockRegion.indexOf(val.id) > -1 ? setLockAttribute(newPath, val) : notLockAttribute(newPath, val);
            return mapRef.current.appendChild(newPath)
        })
    }, [])

    return (
        <div className='passport relative'>
            <img src={passport} alt="passport" width={"172px"} />
            <div className='passport_card'>
                <div className='passport_card-inner'>
                    <div className="passport-upper flex">
                        <div className='relative'>
                            {data.img ?
                                <img src={data.img} alt="profile-pic" width="120px" height={"130px"} className="profile-pic" /> :
                                <img src={dummyProfile} alt="profile-pic" width="120px" height={"130px"} onClick={handleCameraMode} />}
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
                        <div className='relative map-world'>
                            <svg ref={mapRef} width={"370"} height={"140"} viewBox={"15 40 340 130"}>

                            </svg>
                        </div>
                        {/* <img src={worldMap} alt="world-map" width={"100%"} height={"100%"} /> */}
                    </div>
                </div>
            </div>
            <a href={data.img} download={data.name || "profile_pic"} className='btn-download flex align-center gap-10'>
                <img src={downloadIcon} alt="download-icon" height={"20px"} />
                <span>Download</span>
            </a>
        </div>
    )
}

export default Landing


