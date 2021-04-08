import {Card, Col, Container, Form, ProgressBar, Row, Spinner} from "react-bootstrap";
import React from "react";
import TurnoCalendar from "../TurnoCalendar";
import {Label} from "reactstrap";

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

const Stats = (props) => (
    <div className="">
        <Row className="justify-content-between m-2 p-2">
            <Col lg={2} sm={12}>
                { props.step > 1 &&
                <button className='btn btn-primary btn-block' onClick={()=>{props.handleGoBack();props.previousStep();}}>Ir Atras</button>
                }
            </Col>
            <Col lg={2} sm={12}>
                { props.step < props.totalSteps ?
                    <button className='btn btn-primary btn-block' onClick={()=>{props.handleNext();props.nextStep();}} disabled={props.disabledNext}>Siguiente</button>
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
    </div>
);

export const First = props => {
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
                    <label>Escoja un equipo</label>
                    <Form.Control value={props.equipo} onChange={props.handleChange} as="select" id="equipos">
                        <option selected value="none" hidden disabled>Escoja el tipo de equipo...</option>
                        {props.arrayEquipos}
                    </Form.Control>
                </Col>
                <div className="vl"/>
                <Col lg={5} sm={12} className="flex-centered-container">
                    {!props.servicios &&
                        <p>Esperando por la seleccion de un equipo...</p>
                    }
                    {props.loadingServicios ?
                        <Spinner variant="primary" animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> :
                        <React.Fragment>
                            <label>Escoja que servicio requiere</label>
                            <Form.Control value={props.servicio} onChange={props.handleChangeServicio} as="select" id="servicios">
                                <option selected value="none" hidden disabled>Escoja el servicio...</option>
                                {props.servicios}
                            </Form.Control>
                        </React.Fragment>
                    }
                </Col>
            </Row>
            <Stats step={1} {...props} handleNext={props.handleNext} disabledNext={props.disabledNext} />
        </div>
    );
};

export const Horario = (props) => {
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
                handleDate={props.date}
                onChangeDate={props.setDate}
                handleTime={props.time}
                onChangeTime={props.setTime}
                setSeccionDelDia={props.setSeccionDelDia}
            />
            <Stats step={3} {...props} disabledNext={props.disabledNext}/>
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
                            <span> <strong>{props.equipo}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Taller: </Label>
                            <span> <strong>{props.taller}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Servicio: </Label>
                            <span> <strong>{props.servicio}</strong></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Fecha: </Label>
                            <span> <strong>{props.fecha.getDate()+"/" + (props.fecha.getMonth() + 1) + "/" + props.fecha.getFullYear() + " " + props.time + " " + props.seccionDelDia}</strong></span>
                        </Col>
                    </Row>
                    <Card.Footer className="text-muted">Si todo esta correcto por favor confirme su reserva</Card.Footer>
                </Card.Body>
            </Card>
            <Stats step={4} {...props} nextStep={props.submit} disabledNext={props.disableNext} />
        </div>
    );
};

export const Second = props => {
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
                                <label>Escoja el taller que desea</label>
                                <Form.Control value={props.taller} onChange={(e)=>props.setTaller(e.target.value)} as="select" id="talleres">
                                    <option value="none">Seleccione el taller...</option>
                                    {props.arrayTallers}
                                </Form.Control>
                            </div>
                            <div className="p-2">
                                <label>Escriba una breve descripción de su defecto</label>
                                <Form.Control
                                    type="textarea"
                                    placeholder="Defecto del equipo"
                                    value={props.defecto}
                                    onChange={(e) => props.setDefecto(e.target.value)}
                                />
                            </div>
                            <div>
                                {props.isActiveDomicilio &&
                                    <Form.Check
                                        type="checkbox"
                                        size="lg"
                                        checked={props.domicilio}
                                        onChange={(e)=>props.setDomicilio(e.target.value)}
                                        label="El servicio a domicilio esta disponible, marque esta casilla si necesita que vayamos por usted!"
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
                    <Stats step={2} {...props} handleGoBack={props.handleGoBack}/>
                </React.Fragment>)
            }
        </div>
    );
};