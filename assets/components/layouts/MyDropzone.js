import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Alert, Button, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {uploadFileFetch} from "../../redux/mediaObject/upload/uploadMediaObjectActions";

function MyDropzone({setShow}) {
    const [file, setFile] = useState([]);
    const [filename, setFilename] = useState([]);
    const [data, setData] = useState(null);
    const savingImageLoading = useSelector(state=> state.mediaObject.upload.loading);
    const errorSavingImage = useSelector(state=> state.mediaObject.upload.error);
    const image = useSelector(state=> state.mediaObject.upload.file);

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

                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    setData(reader.result);
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

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(file.preview);
    }, [file]);

    const handleSubmit = () =>{
        const values = {
            filename: filename,
            data: data
        }
        dispatch(uploadFileFetch(values));
    }

    useEffect(() => {
        if(image){
            console.log(image);
        }
    }, [image])

    return (
        <section className="my-dropzone container">
            { savingImageLoading &&
                <Alert key="loading-alert" variant="info">
                    Cambiando imagen por favor espere...
                </Alert>
            }
            { errorSavingImage &&
            <Alert key="loading-alert" variant="danger">
                {errorSavingImage}
            </Alert>
            }
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
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
                    <Button onClick={handleSubmit} variant="primary">Cambiar</Button>
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