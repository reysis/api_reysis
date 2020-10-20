import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/turno/create';
import { load } from "../../actions/tipo equipo/load";


class Create extends Component {

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.object,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if(!this.props.loggedUser){
      return (
          <Redirect
            to={`/login`}
          />
      );
    }
    if (this.props.created)
      return (
        <Redirect
          to={`edit/${encodeURIComponent(this.props.created['@id'])}`}
        />
      );
    return (
      <div className="container">
        {this.props.loading && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}

        <Form onSubmit={this.props.create} values={this.props.item}/>
        <Link to="." className="btn btn-primary">
          Back to list
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.turno.create;
  const loggedUser = state.user.auth.logged
  return { created, error, loading, loggedUser };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
