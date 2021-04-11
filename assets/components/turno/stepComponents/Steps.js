import {Card, Col, Container, Form, ProgressBar, Row, Spinner} from "react-bootstrap";
import React, {useState} from "react";
import TurnoCalendar from "../TurnoCalendar";
import {Label} from "reactstrap";
import {Input, InputChecker, InputTextArea, Option} from "../../layouts/Inputs";
import {useSelector} from "react-redux";

export const WizardHeader = props => {
    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        const isActive = props.currentStep === i;
        dots.push(
            <span key={`step-${i}`} className={`dot ${isActive ? 'active' : ''}`} onClick={() => props.currentStep > i && props.goToStep(i)}>
        &bull;
      </span>
        );
    }

    return <div className="nav">{dots}</div>;
};

const WizardNav = (props) => {
    const prevClick = () => {
        props.previousStep();
    };

    const nextClick = () => {
        console.log(props.isChecked());
        props.isChecked() && props.nextStep();
    };

    return (
        <div className="">
            <Row className="justify-content-between m-2 p-2">
                <Col lg={2} sm={12}>
                    { props.currentStep > 1 &&
                    <button className='btn btn-primary btn-block' onClick={prevClick}>Ir Atras</button>
                    }
                </Col>
                <Col lg={2} sm={12}>
                    { props.currentStep < props.totalSteps ?
                        <button className='btn btn-primary btn-block' onClick={nextClick}>Siguiente</button>
                        :
                        <button className='btn btn-success btn-block' onClick={props.nextStep}>Enviar</button>
                    }
                </Col>
            </Row>
            <Row className='p-5 mx-auto'>
                <Col lg={12} sm={12}>
                    <ProgressBar animated now={props.step * 100 / props.totalSteps} />
                </Col>
            </Row>
        </div>);
};

export const First = props => {
    const [check, setCheck] = useState(false)
    const isCheked = () =>{
        const b = props.formState.equipo !== '' && props.formState.servicio !== '';
        setCheck(!b);
        return b;
    }
    return (
        <div className="container">
            <Row>
                <Col lg={12} sm={12}>
                    <div className="form-headers text-center my-4">
                        <h2 className='text-center'><span>Seleccione el equipo que desea reparar</span></h2>
                    </div>
                </Col>
            </Row>
            <Row className={"justify-content-between"}>
                <Col lg={5} sm={12} className="flex-centered-container">
                    <Option
                        value={props.formState.equipo}
                        id={"select-equipo"}
                        text={"Escoja un equipo"}
                        onChange={v => props.setFormState({...props.formState, equipo: v})}
                        options={props.arrayEquipos}
                        check={check}
                        defaultValue={""}
                        required
                    />
                </Col>
                <div className="vl"/>
                <Col lg={5} sm={12} className="flex-centered-container">
                    {!props.arrayServicios &&
                        <p>Esperando por la seleccion de un equipo...</p>
                    }
                    {props.loadingServicios &&
                        <Spinner variant="primary" animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    {!props.loadingServicios && props.arrayServicios &&
                        <React.Fragment>
                            <Option
                                defaultValue={""}
                                check={check}
                                options={props.arrayServicios}
                                text={"Escoja que servicio requiere"}
                                loading={props.loadingServicios}
                                onChange={v => props.setFormState({...props.formState, servicio: v})}
                                id={"select-servicios"}
                                value={props.formState.servicio}
                                required
                            />
                        </React.Fragment>
                    }
                </Col>
            </Row>
            <WizardNav currentStep={1} {...props} isChecked={isCheked} />
        </div>
    );
};

export const Second = props => {
    const [check, setCheck] = useState(false);
    const isChecked = () =>{
        const b = props.formState.taller !== '' && props.formState.defecto !== '';
        setCheck(!b);
        return b;
    }
    return (
        <div className={`container ${props.loadingTalleres ? "flex-centered-container": ""}`}>
            {props.loadingTalleres ?
                (<Spinner
                    animation="border"
                    variant="primary"/> ):
                (<React.Fragment>
                    <Row>
                        <Col lg={12} sm={12}>
                            <div className="form-headers text-center my-4">
                                <h2 className='text-center'><span>Seleccione el Taller de su conveniencia!</span></h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} sm={12} className="p-2">
                            <div className="p-2">
                                <Option
                                    value={props.formState.taller}
                                    id={"select-talleres"}
                                    loading={props.loadingTalleres}
                                    onChange={v => props.setFormState({...props.formState, taller: v})}
                                    text={"Escoja el taller que desea"}
                                    required
                                    options={props.arrayTallers}
                                    check={check}
                                    defaultValue={""}
                                />
                            </div>
                            <div className="p-2">
                                <InputTextArea
                                    id={"defecto-textArea"}
                                    value={props.formState.defecto}
                                    onChange={v => props.setFormState({...props.formState, defecto: v})}
                                    placeholder={"Una pequeña descripcion de los problemas que presente su equipo..."}
                                    text={"Escriba una breve descripción de su defecto"}
                                    required
                                    check={check}
                                />
                            </div>
                            <div>
                                {props.isActiveDomicilio &&
                                    <InputChecker
                                        text={"El servicio a domicilio esta disponible, marque esta casilla si necesita que vayamos por usted!"}
                                        onChange={v => props.setFormState({...props.formState, domicilio: v === 'on'})}
                                        value={props.formState.domicilio ? "on" :"off"}
                                        id={"check-domicilio"}
                                    />
                                }
                            </div>
                        </Col>
                        <Col lg={6} sm={12} className="shadow-container">
                            <label>Detalles del Taller</label>
                            <hr />
                            {props.tallerToShow &&
                            <Card className="text-center">
                                <Card.Header>{props.tallerToShow['alias']}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{props.tallerToShow['nombre']}</Card.Title>
                                    <Card.Text>
                                        {props.tallerToShow['address']['postAddress']}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">{props.tallerToShow['address']['indications']}</Card.Footer>
                            </Card>
                            }
                        </Col>
                    </Row>
                    <WizardNav currentStep={2} {...props} isChecked={isChecked}/>
                </React.Fragment>)
            }
        </div>
    );
};

export const Horario = (props) => {
    const [check, setCheck] = useState(false);
    const isChecked = () =>{
        const b = props.formState.date !== null && props.formState.time !== null;
        setCheck(!b);
        return b;
    }
    return (
        <div>
            <Row>
                <Col lg={12} sm={12}>
                    <div className="form-headers text-center my-4">
                        <h2 className='text-center'><span>Seleccionemos el horario apropiado</span></h2>
                    </div>
                </Col>
            </Row>
            <TurnoCalendar
                taller={props.tallerToShow}
                formState={props.formState}
                setFormState={props.setFormState}
                setSeccionDelDia={props.setSeccionDelDia}
                check={check}
            />
            <WizardNav currentStep={3} {...props} isChecked={isChecked}/>
        </div>
    );
};

export const Last = (props) => {
    return (
        <div>
            <Row>
                <Col lg={12} sm={12}>
                    <div className="form-headers text-center my-4">
                        <h2 className='text-center'><span>Verifiquemos que todo esta bien!</span></h2>
                    </div>
                </Col>
            </Row>

            <Card className="text-center">
                <Card.Header>Detalles del Turno</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Label>Equipo: </Label>
                            <span> <strong>{props.formState.equipo}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Taller: </Label>
                            <span> <strong>{props.formState.taller}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Servicio: </Label>
                            <span> <strong>{props.formState.servicio}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Fecha: </Label>
                            <span> <strong>{props.formState.date.getDate()+"/" + (props.formState.date.getMonth() + 1) + "/" + props.formState.date.getFullYear() + " " + props.formState.time}</strong></span>
                        </Col>
                    </Row>
                    <Card.Footer className="text-muted">Si todo esta correcto por favor confirme su reserva</Card.Footer>
                </Card.Body>
            </Card>
            <WizardNav currentStep={4} {...props} nextStep={props.submit} disabledNext={props.disableNext} />
        </div>
    );
};