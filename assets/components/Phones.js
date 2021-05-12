import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPhone, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const Phones = ({phones, setPhones, enableEdit}) => {
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [tableOfPhones, setTableOfPhones] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState([]);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [animation, setAnimation] = useState('');

    const [phoneTypes] = useState([
        "",
        "Casa",
        "Personal",
        "Trabajo"
    ])

    const handleDeletePhone = (id) =>{
        enableEdit &&
        setPhones(phones.filter( (currentValue, index)=> {
            return index !== id
        } ));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        setPhones([...phones, {number:phone, phoneType}]);
        setPhone("");
        setPhoneType("");
    }

    let timeout = null;

    useEffect(() => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            let reg = new RegExp("^[0-9 \+\(\)]+$");
            setIsValidPhone(() => reg.test(phone))
        }, 1000);
    }, [phone])

    useEffect(()=>{
        let array = [phones.map((item, index)=>{
            return (
                <tr key={index}>
                    {item.number &&
                        <>
                            <td>{index + 1}</td>
                            <td>{item.number}</td>
                            <td>{item.phoneType}</td>
                            <td>
                                <div onClick={()=> handleDeletePhone(index)}>
                                    <FontAwesomeIcon icon={faTrash} color="red"/>
                                </div>
                            </td>
                        </>
                    }
                </tr>
            )
        })];
        setTableOfPhones(array);
    }, [phones])

    useEffect(()=>{
        if(phone !== "" && phoneType !== ""){
            setAnimation('bounce');
            setDisableSubmit(false);
        }
        else{
            setAnimation('');
            setDisableSubmit(true);
        }
    }, [phone, phoneType]);

    return (
        <Container>
            { enableEdit &&
            <Form onSubmit={handleSubmit} className="phone-form">
                <Form.Group className="form-header text-center my-4">
                    <h2 className="mb-2"><span>Teléfonos</span></h2>
                    <span>¡Añada sus teléfonos!</span>
                </Form.Group>
                <Form.Row className="phone-form__row">
                    <Form.Group as={Col} md={5}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="register-phone">
                                    <FontAwesomeIcon icon={faPhone} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control
                                disabled={!enableEdit}
                                type="phone"
                                id="register-phone"
                                placeholder="Número de Teléfono"
                                value={phone}
                                isInvalid={phone.length && !isValidPhone}
                                isValid={phone.length && isValidPhone}
                                onChange={(e) => setPhone(e.target.value)}
                                required={true}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md={5}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="register-phone-type">
                                    <FontAwesomeIcon icon={faBars} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control
                                disabled={!enableEdit}
                                id="register-phone-type"
                                className="custom-select"
                                as="select"
                                value={phoneType}
                                onChange={(e) => setPhoneType(e.target.value)}
                                required={true}
                            >
                                {
                                    phoneTypes.map((value, index) => {
                                        if(value === '')
                                            return <option key={index} value={""}>Tipo de Teléfono</option>
                                        return <option key={index} value={value}>{value}</option>
                                    })
                                }
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md={2} className={`phone-form__submit ${animation}`}>
                        <Button block disabled={disableSubmit} onClick={handleSubmit} variant="primary" type="button">
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            }
            {
                tableOfPhones.length !== 0
                    ? (
                    <Table>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Número</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableOfPhones}
                        </tbody>
                    </Table>
                    ):(
                        <div>No hay números añadidos aun</div>
                    )
            }
        </Container>
    );
};

export default Phones;