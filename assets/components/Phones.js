import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPhone, faPlus} from "@fortawesome/free-solid-svg-icons";

const Phones = ({phones, setPhones, enableEdit}) => {
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [tableOfPhones, setTableOfPhones] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState([]);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const [phoneTypes] = useState([
        "Casa",
        "Personal",
        "Trabajo"
    ])

    const handleSubmit = (e) =>{
        e.preventDefault();

        setPhones([...phones, {number:phone, phoneType}]);
        setPhone("");
        setPhoneType("");
    }

    const handleDelete = (index) =>{
        delete phones[index];
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
        console.log("ACTIVATED USE EFFECT!")
        let array = [phones.map((item, index)=>{
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.number}</td>
                    <td>{item.phoneType}</td>
                </tr>
            )
        })];
        setTableOfPhones(array);
    }, [phones])

    useEffect(()=>{
        if(phone !== "" && phoneType !== "")
            setDisableSubmit(false);
        else
            setDisableSubmit(true);
    }, [phone, phoneType]);

    return (
        <Container>
            { enableEdit &&
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md={6}>
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
                        <Form.Group as={Col} md={6}>
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
                                    defaultValue={phoneType}
                                    onChange={(e) => setPhoneType(e.target.value)}
                                    required={true}
                                >
                                    <option value="" >Tipo de Télefono ...</option>
                                    {
                                        phoneTypes.map((value, index) => (
                                            <option key={index} value={value}>{value}</option>
                                        ))
                                    }
                                </Form.Control>
                            </InputGroup>
                            <Form.Group className="register-submit">
                                <Button disabled={disableSubmit} onClick={handleSubmit} variant="primary" type="button">
                                    <FontAwesomeIcon icon={faPlus}/>
                                </Button>
                            </Form.Group>
                        </Form.Group>
                    </Form.Row>
                </Form>
            }
            <Table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Número</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {tableOfPhones}
                </tbody>
            </Table>
        </Container>
    );
};

export default Phones;
