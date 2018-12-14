import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ThemeContainer from '../containers/Theme';
import MultiDatePickerContainer from '../containers/MultiPickerContainer';
import ThemeConsumerContainer from '../containers/ThemeConsumer';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={MultiDatePickerContainer} />
                    <Route path="/context" component={ThemeContainer} />
                    <Route path="/contextConsumer" component={ThemeConsumerContainer} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
