import React, { Component } from 'react';
import moment from 'moment';
import MultiDatePicker from '../components/MultiDatePicker';

class MultiPickerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(values) {
        this.setState({ values });
    }

    render() {
        const { values } = this.state;
        return (
            <div className="app-view">
                <div>
                    <p>获取到的日期:</p>
                    <p>{values.map(item => moment(item).format('ll')).join(';')}</p>
                </div>
                <MultiDatePicker
                    value={values}
                    onChange={this.onChange}
                    startTime={moment('2018-11-2')}
                    endTime={moment('2019-2-3')}
                />
            </div>
        );
    }
}

export default MultiPickerContainer;
