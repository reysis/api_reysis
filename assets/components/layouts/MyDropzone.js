import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Alert, Button, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {uploadFileClearAll, uploadFileFetch} from "../../redux/mediaObject/upload/uploadMediaObjectActions";
import Toast from "../Utils/Toast";
import {userLoguedFetch} from "../../redux/auth/token/authTokenActions";

function MyDropzone({setShow}) {
    const [file, setFile] = useState([]);
    const [filename, setFilename] = useState([]);
    const [data, setData] = useState(null);
    const savingImageLoading = useSelector(state=> state.mediaObject.upload.loading);
    const errorSavingImage = useSelector(state=> state.mediaObject.upload.error);
    const image = useSelector(state=> state.mediaObject.upload.file);
    const user = useSelector(state=> state.auth.token.authenticatedUser);
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [buttonText, setButtonText] = useState("Cambiar");
    const dispatch = useDispatch();

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: useCallback( (acceptedFiles) => {
            setFile(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            );
            acceptedFiles.forEach((file) => {
                const reader = new FileReader()

                 reader.onload = () => {
                    // Do whatever you want with the file contents
                    let b64 = reader.result.replace(/^data:.+;base64,/, '');
                    setData(b64);
                    setFilename(file.path);
                }
                reader.readAsDataURL(file)
            })
        },[])
    });

    const thumbs = file.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                />
            </div>
        </div>
    ));

    useEffect(()=>{
        if(!file.length){
            setDisabledSubmit(true);
        }else{
            setDisabledSubmit(false);
        }
    }, [file])

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(file.preview);
    }, [file]);

    const handleSubmit = () =>{
        const values = {
            filename: filename,
            data: data,
            user: user['@id']
        }
        dispatch(uploadFileFetch(values))
    }

    useEffect(() => {
        if(image){
            Toast.success("Imagen cambiada satisfactoriamente!")
            dispatch(uploadFileClearAll());
            dispatch(userLoguedFetch(user['@id']))
            setShow(false);
        }
    }, [image])

    useEffect(()=>{
        if(savingImageLoading){
            setButtonText("Cambiando...")
        }
    }, [savingImageLoading])

    useEffect(()=>{
        if(errorSavingImage){
            setButtonText("Error!");
        }
    }, [errorSavingImage])

    useEffect(()=>{
        if(errorSavingImage){
            Toast.error(errorSavingImage);
            dispatch(uploadFileClearAll());
        }
    }, [errorSavingImage])

    return (
        <section className="my-dropzone container">
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Arrastre ficheros aqui, o de un click para seleccionar</p>
                    </div>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <aside className="thumbsContainer">
                        {
                            thumbs.length ? thumbs : <p>Seleccione una imagen para ver la vista previa</p>
                        }
                    </aside>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Button
                        onClick={handleSubmit}
                        variant="primary"
                        disabled={disabledSubmit}
                    >
                        {buttonText}
                    </Button>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Button
                        onClick={() => setShow(false)}
                        variant="danger"
                    >Cancelar</Button>
                </Col>
            </Row>
        </section>
    )
}

export default MyDropzone;