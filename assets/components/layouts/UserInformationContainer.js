import React, {useEffect, useState} from 'react';
import {Button, Col, Form, InputGroup, Row, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faFlag,
    faIdCard, faLock,
    faMapSigns,
    faPhone, faRedoAlt, faUndo,
    faUser,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import Phones from "../Phones";
import {updateUserFetch} from "../../redux/user/update/updateUserActions";
import {Link} from "react-router-dom";

const UserInformationContainer = ({user}) => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [ci, setCi] = useState("");
    const [address, setAddress] = useState("");
    const [indications, setIndications] = useState("");
    const [nationality, setNationality] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState("");
    const [phones, setPhones] = useState([]);

    const [arePasswordMatch, setArePasswordMatch] = useState(false)
    const [disabledField, setDisabledField] = useState(true);
    const [enableEdit, setEnableEdit] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validCid, setValidCid] = useState(false)
    const [validUsername, setValidUsername] = useState(false)
    const [invalidPhones, setInvalidPhones] = useState(false);

    const userGlobal = useSelector(state=> state.user.update.user);
    const authenticatedUser = useSelector(state=> state.auth.user);
    const error = useSelector(state=>state.user.update.error);
    const loadingUpdate = useSelector(state => state.user.update.loading);

    const dispatch = useDispatch();

    var timeout = null, timeout2 = null, timeout3 = null, timeout4 = null, timeout5 = null, timeout6 = null;

    useEffect(()=>{
        if(user){
            setPhones(
                user['phoneNumbers'].map((value, index)=>{
                    return {
                        number: value.number,
                        phoneType: value.phoneType
                    }
                })
            )
        }
    }, [user])

    const handleEdit = () =>{
        let statusNow = !enableEdit
        if(!statusNow){
            setPhones(
                user['phoneNumbers'].map((value, index)=>{
                    return {
                        number: value.number,
                        phoneType: value.phoneType
                    }
                })
            );
            setUsername("");
            setIndications("");
            setAddress("");
            setEmail("");
            setPassword("");
            setCi("");
            setName("");
        }
        setEnableEdit(statusNow);
        setDisabledField(enableEdit);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(phones.length === 0){
            timeout6 && clearTimeout(timeout6);
            setInvalidPhones(true);
            timeout6 = setTimeout(()=>{
                setInvalidPhones(false);
            }, 5000)
            return;
        }

        dispatch(updateUserFetch(user['@id'],{
            username,
            password,
            name,
            indications,
            address,
            ci,
            phones,
            email,
            nationality,
            user
        }));
    }

    useEffect(()=>{
        if(userGlobal)
            setEnableEdit(false)
    }, [userGlobal]);

    useEffect(() => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            // RFC
            let reg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
            setValidEmail(() => reg.test(email))
        }, 1000);
    }, [email])

    useEffect(() => {
        if (timeout2) clearTimeout(timeout2)
        timeout2 = setTimeout(() => {
            let reg = /^[0-9]{11,11}$/
            setValidCid(() => reg.test(ci))
        }, 1000);
    }, [ci])

    useEffect(() => {
        if (timeout3) clearTimeout(timeout3)
        timeout3 = setTimeout(() => {
            let reg = /^(\w{3,})$/
            setValidUsername(() => reg.test(username))
        }, 1000);
    }, [username])

    useEffect(() => {
        if (timeout5) clearTimeout(timeout5)
        timeout5 = setTimeout(() => {
            let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
            setValidPassword(() => reg.test(password))
        }, 1000);
    }, [password])

    useEffect(() => {
        if(password.length > 0 && passwordCheck.length > 0 && password === passwordCheck){
            setArePasswordMatch(true);
            setDisableSubmit(false);
        }else{
            setArePasswordMatch(false);
            setDisableSubmit(true);
        }
    }, [password, passwordCheck])

    return (
        <div id="informacion" className="user-profile-tab__container">
            {!enableEdit &&
                <Button className="user-profile-buttons" variant="primary" block type="submit" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faUserEdit} />
                </Button>
            }
            {enableEdit &&
                <Button className="user-profile-buttons" variant="primary" block type="cancel" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faUndo} />
                </Button>
            }
            <Form className="my-3 pb-3 col-xl-12 col-lg-12 col-md-12 form-update">
                <Row className="form-update-main-row">
                    <Col md={10} className="form-update-main-col">
                        <Form.Group className="form-header text-center my-4">
                            <h2 className="mb-2"><span>Tu información personal</span></h2>
                            <span>Verifiquemos que todo está en orden</span>
                        </Form.Group>
                        <Form.Row md={6}>
                            <Form.Group as={Col} sm={12} md={6} lg={6}>
                                <span className="user-profile-tab__info-field">Username</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-username">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="username"
                                        id="register-username"
                                        placeholder={user['username']}
                                        value={username}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setUsername(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={6} lg={6}>
                                <span className="user-profile-tab__info-field">Nombre</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-name">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="name"
                                        id="register-name"
                                        placeholder={user['persona']['nombre']}
                                        value={name}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setName(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <span className="user-profile-tab__info-field">CI</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-ci">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faIdCard} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="id" id="register-ci"
                                        placeholder={user['persona']['ci']}
                                        value={ci}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setCi(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={6} lg={6}>
                                <span className="user-profile-tab__info-field">Nacionalidad</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-nationality">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faFlag} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="text"
                                        id="register-nationality"
                                        placeholder={user['nationality']}
                                        value={nationality}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setNationality(e.target.value);
                                        }} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <span className="user-profile-tab__info-field">Password</span>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-password">
                                            <FontAwesomeIcon icon={faLock} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="password"
                                        id="register-password"
                                        title="Mínimo 6 caracteres, al menos 1 mayúscula, minúscula y número"
                                        placeholder="Contraseña"
                                        isValid={password.length && arePasswordMatch && validPassword}
                                        isInvalid={password.length >= 6 && !validPassword}
                                        value={password}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <span className="user-profile-tab__info-field">Repetir Password</span>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-passwordCheck">
                                            <FontAwesomeIcon icon={faRedoAlt} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="password"
                                        id="register-passwordCheck"
                                        placeholder="Confirmar Contraseña"
                                        isValid={arePasswordMatch && validPassword}
                                        value={passwordCheck}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setPasswordCheck(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={12} lg={12}>
                                <span className="user-profile-tab__info-field">Dirección</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-address">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faAddressBook} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="text"
                                        id="register-address"
                                        placeholder={user['address']['postAddress']}
                                        value={address}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setAddress(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} sm={12} md={12} lg={12}>
                                <span className="user-profile-tab__info-field">Indicaciones sobre la dirección</span>
                                <InputGroup>
                                    <InputGroup.Prepend htmlFor="register-indications">
                                        <label className="input-group-text">
                                            <FontAwesomeIcon icon={faMapSigns} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={disabledField}
                                        type="text"
                                        id="register-indications"
                                        placeholder={user['address']['indications']}
                                        value={indications}
                                        onChange={(e) => {
                                            if(e.target.value !== "")
                                                setDisableSubmit(false);
                                            else
                                                setDisableSubmit(true);
                                            setIndications(e.target.value);
                                        }}/>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col>
                    {invalidPhones && <Alert variant="danger">Debe introducir al menos un teléfono</Alert>}
                    <Phones phones={phones} setPhones={setPhones} enableEdit={enableEdit}/>
                    { enableEdit &&
                    <Form.Group className="register-submit">
                        <Button onClick={handleSubmit} variant="primary" block type="submit">Salvar</Button>
                    </Form.Group>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default UserInformationContainer;
