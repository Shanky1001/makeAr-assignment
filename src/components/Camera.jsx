import React, { useEffect } from 'react'
import { useRef } from 'react';
import { GetContext } from '../App'
import { closeBtn, retakeBtn, shutterBtn } from '../assets'

const width = 217;
const height = 320;
const Camera = () => {
    const { data, setCamera, camera, cameraMode, handleCameraMode, handleData } = GetContext();
    const videoRef = useRef();
    const canvasRef = useRef();
    // Open Camera
    useEffect(() => {
        if (!data.img && cameraMode) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: width,
                    height: height
                },
            }).then((res) => {
                setCamera(res)
                const video = videoRef.current
                video.srcObject = res;
                video.onloadedmetadata = () => {
                    video.play();
                };
            }).catch((err) => {
                console.log(err)
            })
        } else {
            videoRef.current.style.display = "none";
            const canvas = canvasRef.current;
            canvas.style.display = "block";
            var img = new Image({ width: width, height: height });
            img.src = data.img;
            console.log(canvas.width);
            canvas.getContext('2d').drawImage(img, 0, 0)
        }

        return () => {
            camera?.getVideoTracks().forEach(element => {
                if (element.enabled) {
                    element.stop()
                }
            });
        }
    }, [data.img, cameraMode, setCamera])

    // Handle Image Click
    const handleImageClick = () => {
        videoRef.current?.pause();
        const canvas = canvasRef.current;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        handleData("img", canvas.toDataURL('image/webp'));
        canvas.style.display = "block";
        videoRef.current.style.display = "none";
        camera?.getVideoTracks().forEach(element => {
            if (element.enabled) {
                element.stop()
            }
        });
    }
    // Handle Image retake
    const handleImageRetake = () => {
        handleData("img", "");
        canvasRef.current.style.display = "none";
        videoRef.current.style.display = "block";
        videoRef.current.play();
    }

    return (
        <div className='page-camera'>
            <div className='camera relative'>
                <video autoPlay ref={videoRef}>
                </video>
                <canvas className='stream-canvas' ref={canvasRef} width={width} height={height}></canvas>
                {data.img ? <img src={retakeBtn} alt="retake-button" className='cta-click' onClick={handleImageRetake} /> : <img src={shutterBtn} alt="shutter-button" className='cta-click' onClick={handleImageClick} />}
                <img src={closeBtn} alt="close-button" className='cta-close' onClick={handleCameraMode} />
            </div>
            <form className='actions' onSubmit={handleCameraMode}>
                <input type="text" placeholder='Enter your name' pattern="^[A-Za-z]{1,30}$" value={data.name} title={"Only 30 letters alphabet is allowed"} onChange={(e) => handleData("name", e.target.value)} />
                <button className='btn btn-save' disabled={data.img === ""} type='submit'>
                    Save
                </button>
            </form>
        </div>
    )
}

export default Camera