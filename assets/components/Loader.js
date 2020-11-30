import React, { useEffect, useRef } from 'react'

const LoaderSpinner = () => {

    const loaderRef = useRef(null);

    const handleLoad = () => {
        loaderRef.current.classList.add("fade-out")
        setTimeout(() => {
            loaderRef.current.classList.remove("fade-out")
            loaderRef.current.classList.add("d-none")
        }, 500);
    }

    useEffect(() => {
        window.addEventListener('load', handleLoad)
        return () => {
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    return (
        <div ref={loaderRef} id="preloader-home">
            <div className="loader" />
        </div>
    )
}

export default LoaderSpinner;
