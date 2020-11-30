import React, { useEffect, useRef } from 'react'

const LoaderLocalSpinner = () => {

    const loaderRef = useRef(null);

    return (
        <div ref={loaderRef} className="loader-local">
            <div className="loader" />
        </div>
    )
}

export default LoaderLocalSpinner;
