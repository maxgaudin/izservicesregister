/* eslint no-param-reassign: off */
/* eslint no-alert: off */
/* eslint no-confirm: off */
/* eslint "no-confusing-arrow": off */

import React, { PropTypes, Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class RenderFees extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPaid: null,
    };
  }

  componentDidMount() {
    this.getPayments(this.props.fee.id);
  }

  getPayments(feeId) {
    axios.get(`http://localhost:8080/v1/payments?fee_id=${ feeId }`)
      .then(({ data: { data } }) =>
        this.setState({ totalPaid: data.reduce((t, p) => p.amount + t, 0) }))
      .catch((error) => console.error(error));
  }

  render() {
    const { fee } = this.props;
    return (
      <tr key={ fee.id }>
        <td>${fee.total_amount}</td>
        <td>${fee.total_amount - this.state.totalPaid}</td>
        <td>{fee.created_at}</td>
        <td>
          <button
            className='btn btn-primary btn-sm'
            key={ fee.id }
            id={ fee.id }
            value={ fee.id }
            onClick={ (e) => confirm('Delete Fee?') && this.deleteFee(e) }
          >
          Delete Fee
        </button>
        </td>
        <td>
          <NavLink
            to={ `/application/client/${ this.props.client_id }/vehicles/${ this.props.vehicle_id }/fees/${ fee.id }/payments` }
            className='btn btn-primary btn-sm'
            id={ `enter${ fee.id }` }
            value={ fee.id }
          >
          View Payments
        </NavLink>
        </td>
        <td>
          <button
            className='btn btn-primary btn-sm'
            id={ `enter${ fee.id }` }
            value={ fee.id }
            onClick={ () => this.toggleDetails(fee) }
          >
          Details
        </button>
        </td>
      </tr>
    );
  }
}

RenderFees.propTypes = {
  client_id: PropTypes.string.isRequired,
  vehicle_id: PropTypes.string.isRequired,
  fee: PropTypes.object.isRequired,
};

export default RenderFees;
