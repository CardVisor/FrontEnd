import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';

import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ThemeEditorProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/main" />} />
                        <Route path="/*" element={<AdminLayout />} />
                    </Routes>
                </BrowserRouter>
            </ThemeEditorProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
