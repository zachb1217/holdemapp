import React from 'react';
import '../styles/Table.css';
import '../styles/Card.css';
import _ from 'lodash';
import {generateImg} from '../utils/cardUtils';

export class Table extends React.Component {
  render() {

    return <div>
    <div className='Table'>
    {
      _.map(this.props.cards, generateImg)
    }
    </div>
    </div>;
  }
}

export default (Table);