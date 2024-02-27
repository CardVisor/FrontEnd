import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';

import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ThemeEditorProvider>
                <BrowserRouter basename={process.env.public}>
                    <RecoilRoot>
                        <Routes>
                            <Route path="/*" element={<AdminLayout />} />
                            <Route path="/" element={<Navigate replace to="/main" />} />
                        </Routes>
                    </RecoilRoot>
                </BrowserRouter>
            </ThemeEditorProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
