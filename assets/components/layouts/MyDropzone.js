import React, {useCallback} from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from "react-redux";
import ENTRYPOINT from '../../config/entrypoint';

const MyDropzone = (props) => {
    const loading =  useSelector(state => state.mediaObject.upload.loading);
    const error  = useSelector(state => state.mediaObject.upload.error);
    const file = useSelector(state => state.mediaObject.upload.file);
    // const handleDrop = (files) =>{
    //     files.map(item => console.log(item));
    // }
    return (
        <div/>
    )
}

export default MyDropzone;