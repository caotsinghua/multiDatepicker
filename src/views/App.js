import React, { Component } from 'react';
import MultiDatePicker from '../components/MultiDatePicker';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="app-view">
                <MultiDatePicker />
            </div>
        );
    }
}

export default App;
