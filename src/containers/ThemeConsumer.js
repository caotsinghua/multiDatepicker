import React, { Component } from 'react';

const themes = {
    dark: {
        foreColor: '#fff',
        background: '#000',
    },
    light: {
        foreColor: '#000',
        background: '#fff',
        borderColor: '#000',
    },
};
const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => {
        console.log('change');
    },
});

function ThemeToggleButton() {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => {
                const { foreColor, background, borderColor } = theme;
                const style = {
                    color: foreColor,
                    backgroundColor: background,
                    border: borderColor && `1px solid ${borderColor}`,
                };

                return (
                    <button type="button" onClick={toggleTheme} style={style}>
                        toggle theme
                    </button>
                );
            }}
        </ThemeContext.Consumer>
    );
}

class ConsumerContainer extends Component {
    constructor() {
        super();
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
        };
    }

    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.light ? themes.dark : themes.light,
        }));
    };

    render() {
        const { theme, toggleTheme } = this.state;
        const store = {
            theme,
            toggleTheme,
        };
        return (
            <ThemeContext.Provider value={store}>
                <ThemeToggleButton />
            </ThemeContext.Provider>
        );
    }
}

export default ConsumerContainer;
