// Chakra imports
import { Box, Portal } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import routes from 'routes.js';

// Custom Chakra theme
export default function Dashboard(props) {
    const location = useLocation();
    const { ...rest } = props;

    // states and functions
    const [fixed] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    // functions for changing the states from components
    const getRoute = () => {
        return true;
    };

    const getActiveRoute = (routes) => {
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = '/Main Dashboard';
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].path) !== -1) {
                return routes[i].path;
            }
        }
        return activeNavbar;
    };
    const getActiveNavbarText = (routes) => {
        let activeNavbar = '/Main Dashboard';
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return activeNavbar;
    };

    const getRoutes = (routes) => {
        return routes.map((route, key) => {
            return <Route path={route.path} element={route.element} key={key} />;
        });
    };

    document.documentElement.dir = 'ltr';
    // const { onOpen } = useDisclosure();
    document.documentElement.dir = 'ltr';
    return (
        <Box>
            <Box>
                <SidebarContext.Provider
                    value={{
                        toggleSidebar,
                        setToggleSidebar,
                    }}
                >
                    <Sidebar routes={routes} display="none" {...rest} />
                    <Box
                        float="right"
                        minHeight="100vh"
                        height="100%"
                        overflow="auto"
                        position="relative"
                        maxHeight="100%"
                        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                        transitionDuration=".2s, .2s, .35s"
                        transitionProperty="top, bottom, width"
                        transitionTimingFunction="linear, linear, ease"
                    >
                        <Portal>
                            <Box>
                                <Navbar
                                    // onOpen={onOpen}
                                    // logoText={'Horizon UI Dashboard PRO'}
                                    brandText={getActiveRoute(routes)}
                                    // secondary={getActiveNavbar(routes)}
                                    // message={getActiveNavbarText(routes)}
                                    // fixed={fixed}
                                    {...rest}
                                />
                            </Box>
                        </Portal>

                        <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
                            <Routes>{getRoutes(routes)}</Routes>
                        </Box>

                        <Box>
                            <Footer />
                        </Box>
                    </Box>
                </SidebarContext.Provider>
            </Box>
        </Box>
    );
}
