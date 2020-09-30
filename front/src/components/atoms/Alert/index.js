import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from 'redux/actions/alert.actions';
import PropTypes from 'prop-types';

class Alert extends Component {
  componentWillReceiveProps(nextProps) {
    const { props } = this.props;
    nextProps.alerts.alerts.map((alert) => {
      if (alert.delay > 0) {
        setTimeout(() => {
          props.clear(alert.id);
        }, alert.delay);
        return null;
      }
      return null;
    });
  }

  render() {
    const { alerts } = this.props.alerts;
    const { props } = this.props;

    return (
      <div className="alert__container">
        {alerts.map((alert, index) => (
          <div key={index.toString()} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <p dangerouslySetInnerHTML={{ __html: alert.message }} />
            <button type="button" className="alert-close" onClick={() => props.clear(alert.id)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

const mapDispatchToProps = {
  clear: alertActions.clear,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
