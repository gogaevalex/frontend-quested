import React from 'react';
import {
	BrowserRouter as Router,
} from 'react-router-dom';
import RootRouter from '@src/RootRouter';
import {ThemeProvider} from 'styled-components';
import {theme} from '@src/ui/theme';

const App = () => (
    <Router>
        <ThemeProvider theme={theme}>
                <RootRouter/>
        </ThemeProvider>
    </Router>
);

export default App;
