import React, {Component, useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TurnoCalendar from "./TurnoCalendar";
import {load}  from "../../actions/tipo equipo/load";
import {connect} from "react-redux";
import {fetch} from "../../utils/dataAccess";

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };
  controller = new AbortController();
  state={
      loading: true,
      data: {},
      error: null
  };
  componentDidMount() {
      this.props.loadData()
  }
/*    componentWillReceiveProps(nextProps) {
        if(this.props.data !== nextProps.data){
            this.setState({
                data: nextProps.data,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }*/

    componentWillUnmount() {
        this.controller.abort();
    }

    renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group form-group-turno`}>
        <label
          htmlFor={`turno_${data.input.name}`}
          className="form-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`turno_${data.input.name}`}
          disabled={data.disabled}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  renderTipoEquipos =({data, loading, input}) =>{
      //console.log(data, loading)

      return(
          <select className={`form-group form-group-turno`} {...input}>
              <option value="">Seleccione uno..</option>
              {
                  loading ? (<option/>) :(
                  data.map(tipoEquipoOption => (
                      <option value={tipoEquipoOption['@id']} key={tipoEquipoOption['@id']} >
                          {tipoEquipoOption['nombre']}
                      </option>)
                  ))
              }
          </select>
      );
  };

  render() {
      console.log(this.props.data);
        return (
            this.props.loading ? (<div>Loading...</div>):(
          <form className="form-turno" onSubmit={this.props.handleSubmit}>
            <Field
              component={TurnoCalendar}
              name="Fecha"
              placeholder=""
              type="datetime"
            />
            <Field
              component={this.renderField}
              name="Nombre de la persona citada"
              type="text"
              placeholder=""
            />
            <Field
              component={this.renderTipoEquipos}
              name="Tipo de Equipo"
              type="select"
              placeholder=""
              data={this.state.data['hydra:member']}
              loading={this.state.loading}
            />
            <Field
              component={this.renderField}
              name="Defecto"
              type="text"
              placeholder=""
            />
            <Field
              component={this.renderField}
              name="Teléfono"
              type="string"
              placeholder=""
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
            </div>
          </form>)
        );
  }
}

Form = reduxForm({
  form: 'turno',
  enableReinitialize: true,
})(Form);

const mapDispatchToProps = dispatch =>({
    loadData: data => dispatch(load(data))
});

Form = connect(
    state => ({
        loading: state.tipoEquipo.load.loading,
        data: state.tipoEquipo.load.loaded,
        error: state.tipoEquipo.load.error
    }),
    mapDispatchToProps // bind account loading action creator
)(Form);

export default Form;