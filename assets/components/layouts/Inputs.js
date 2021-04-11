// @ts-ignore
import React, { useState } from 'react';
import { Form, FormText, FormGroup, Label, Input as ReactstrapInput } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';
import { Link as RouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Input = ({
  id,
  row,
  required,
  type = 'text',
  text,
  placeholder,
  value,
  readOnly,
  onChange,
  check,
}) => {
    return (
        <FormGroup className={row ? 'row' : ''}>
            <Label for={id} className={row ? 'col-form-label col-sm-2' : ''}>
        {text}
        </Label>
        <div className={row ? 'd-flex flex-row col col-sm-10' : 'd-flex flex-row'}>
    <ReactstrapInput
        className={required ? 'input-required' : ''}
    id={id}
    name={id}
    type={type}
    placeholder={placeholder}
    value={value}
    readOnly={readOnly}
    required={required}
    onChange={e => onChange && onChange(e.target.value)}
    />
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && !value && <FormText className="notif-required">Completa este campo</FormText>}
        </FormGroup>
        );
};

export const InputPassword = ({
  id,
  row,
  required,
  text,
  placeholder,
  value,
  readOnly,
  onChange,
  check,
  accessGranted,
}) => {
    const [show, setShow] = useState(false);
    return (
        <FormGroup className={row ? 'row input-password-content' : 'input-password-content'}>
            <Label for={id} className={row ? 'col-form-label col-sm-2' : ''}>
        {text}
        </Label>
        <div className={row ? 'd-flex flex-row col col-sm-10 input-password' : 'd-flex flex-row input-password'}>
    <ReactstrapInput
        className={required ? 'input-required' : ''}
    id={id}
    name={id}
    type={show && accessGranted ? 'text' : 'password'}
    placeholder={placeholder}
    value={accessGranted ? value : 'secrect 🖕'}
    readOnly={!accessGranted || readOnly}
    required={required}
    onChange={e => accessGranted && onChange && onChange(e.target.value)}
    />
    {accessGranted && (
        <span className="input-password-show ml-2 my-auto">
        <FontAwesomeIcon icon={show && accessGranted ? 'eye' : 'eye-slash'} onClick={() => setShow(s => !s)} />
    </span>
    )}
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && !value && <FormText className="notif-required">Completa este campo</FormText>}
        </FormGroup>
        );
};

export const InputNumber = ({
    id,
    text,
    placeholder,
    value,
    onChange,
    readOnly,
    required = false,
    check,
    row,
    min = 0,
    max,
}) => {
    return (
        <FormGroup className={row ? 'row' : ''}>
            <Label for={id} className={row ? 'col-form-label col-sm-2' : ''}>
        {text}
        </Label>
        <div className={row ? 'd-flex flex-row col col-sm-10' : 'd-flex flex-row'}>
    <ReactstrapInput
        className={required ? 'input-required' : ''}
    id={id}
    name={id}
    type="number"
    placeholder={placeholder}
    value={+value}
    readOnly={readOnly}
    required={required}
    min={min}
    max={max}
    onChange={e => onChange && onChange(e.target.value)}
    />
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && !value && <FormText className="notif-required">Completa este campo</FormText>}
        </FormGroup>
        );
};

export const InputDate = ({ id, text, value, onChange, readOnly, required = false, check, row }) => {
    return (
        <FormGroup className={row ? 'row' : ''}>
            <Label for={id} className={row ? 'col-form-label col-sm-2' : ''}>
        {text}
        </Label>
        <div className={row ? 'd-flex flex-row col col-sm-10' : 'd-flex flex-row'}>
    <ReactstrapInput
        className={required ? 'input-required' : ''}
    id={id}
    name={id}
    type="datetime-local"
    value={value}
    readOnly={readOnly}
    required={required}
    onChange={e => onChange && onChange(e.target.value)}
    />
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && !value && <FormText className="notif-required">Completa este campo</FormText>}
        </FormGroup>
        );
};

export const InputChecker = ({ id, text, value, onChange, readOnly }) => {
    return (
        <FormGroup check className="form-group">
    <Label check>
    <ReactstrapInput
        name={id}
    type="checkbox"
    // label={text}
    disabled={readOnly}
    checked={value}
    onChange={e => onChange(e.target.checked)}
    />
    {text}
    </Label>
    </FormGroup>
);

};

export const Option = ({
    id,
    text,
    defaultValue,
    value,
    onChange,
    options,
    loading,
    row,
    required,
    check,
}) => {
    return (
        <FormGroup>
            <Label for={id}>{text}</Label>
            <div className={row ? 'd-flex flex-row col col-sm-10' : 'd-flex flex-row'}>
            <ReactstrapInput id={id} name={id} type="select" value={value} disabled={loading} onChange={e => onChange(e.target.value)}>
                <option value="">Seleccione uno...</option>
                {options}
            </ReactstrapInput>
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && !value && <FormText className="notif-required">Completa este campo</FormText>}
        </FormGroup>
        );
};

export const Link = ({ text, route = '#', value }) => {
    return (
        <FormGroup>
            <Label>{text}</Label>
        <Label as={RouterLink} to={route} className="w-100">
        {value}
        </Label>
        </FormGroup>
);
};

export const InputFile = ({ id, text, onChange, multiple, required, accept, check }) => {
    return (
        <FormGroup>
            {text && <Label for={id}>{text}</Label>}
            <div className="d-flex flex-row">
    <ReactstrapInput
        id={id}
    type="file"
    className="w-100"
    name={id}
    onChange={e => onChange(e.target.files[0])}
    multiple={multiple}
    required={required}
    accept={accept}
    />
    {required && <span className="ast-required">*</span>}
        </div>
        {required && check && <FormText className="notif-required">Selecciona una imagen</FormText>}
        </FormGroup>
        );
};

export const InputTextArea = ({
  id,
  text,
  placeholder,
  value,
  onChange,
  readOnly,
  required,
  row,
  check
}) => {
    return (
        <FormGroup>
            <Label for={id}>{text}</Label>
            <div className={row ? 'd-flex flex-row col col-sm-10' : 'd-flex flex-row'}>
    <ReactstrapInput
        id={id}
    type="textarea"
    placeholder={placeholder}
    name={id}
    rows={4}
    value={value}
    readOnly={readOnly}
    onChange={e => onChange(e.target.value)}
    />
    {required && <span className="ast-required">*</span>}
        </div>
            {required && check && <FormText className="notif-required">Complete este campo</FormText>}
        </FormGroup>
    );
};
