import React from 'react'
import { bottomBar, home, logo, sour } from '../assets'
import Landing from "./Landing"
import Camera from './Camera'
import { GetContext } from '../App'

const Layout = () => {

    const { cameraMode } = GetContext();

    return (
        <div className='container'>
            <div className='landing'>
                <Nav />
                <main className='relative'>
                    {!cameraMode ? <Landing /> : <Camera />}
                </main>
                <footer>
                    <img src={bottomBar} alt='bottom-bar' width={"390px"} />
                </footer>
            </div>
        </div>
    )
}

export default Layout


const Nav = () => {
    return <nav className='fcb'>
        <img src={logo} alt="logo" width={"210px"} />
        <div className='flex align-center gap-10'>
            <img src={sour} alt="sour" width={"51px"} />
            <img src={home} alt="home" width={"51px"} />
        </div>
    </nav>
}