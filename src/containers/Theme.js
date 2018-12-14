/* eslint-disable react/no-multi-comp */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const themes = {
    light: {
        foreColor: '#fff',
        background: '#000',
    },
    dark: {
        foreColor: '#000',
        background: '#fff',
        borderColor: '#000',
    },
};
const ThemeContext = React.createContext(themes.dark);

class ThemeButton extends Component {
    static contextType = ThemeContext;

    render() {
        const props = this.props;
        const { foreColor, background, borderColor } = this.context;
        const style = {
            color: foreColor,
            backgroundColor: background,
            border: borderColor && `1px solid ${borderColor}`,
        };
        return (
            <button type="button" {...props} style={style}>
                {props.children}
            </button>
        );
    }
}

function ToolBar({ changeTheme }) {
    return <ThemeButton onClick={changeTheme}>主题改变</ThemeButton>;
}
ToolBar.propTypes = {
    changeTheme: PropTypes.func.isRequired,
};

class TestThemeComtainer extends Component {
    state = {
        theme: themes.light,
    };

    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.light ? themes.dark : themes.light,
        }));
    };

    render() {
        const { theme } = this.state;
        return (
            <Fragment>
                {/* 只有设置在Provider中的，设置了contextType的组件才能使用context */}
                <ThemeContext.Provider value={theme}>
                    <ToolBar changeTheme={this.toggleTheme} />
                    <ThemeButton>hello2</ThemeButton>
                </ThemeContext.Provider>
                <div className="other">
                    {/* 不会随theme变化 */}
                    <ThemeButton onClick={this.toggleTheme}>自己主题不变，其他元素改变</ThemeButton>
                </div>
            </Fragment>
        );
    }
}
export default TestThemeComtainer;
