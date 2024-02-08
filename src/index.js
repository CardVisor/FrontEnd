import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <ThemeEditorProvider>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/main" />
                        <Route path={'/'} component={AdminLayout} />
                    </Switch>
                </BrowserRouter>
            </ThemeEditorProvider>
        </React.StrictMode>
    </ChakraProvider>,
    document.getElementById('root')
);
