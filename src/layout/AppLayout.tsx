import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery, styled } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const Layout = styled('div')({
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f9f9f9',
});

const Main = styled('main')({
    flex: 1,
    marginTop: 64,
    padding: '24px',
    overflowY: 'auto',
    backgroundColor: '#fff',
});

const AppLayout: React.FC = () => {
    const isMobile = useMediaQuery('(max-width:900px)');
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => setOpen(prev => !prev);

    return (
        <Layout>
            <Sidebar open={open} onClose={toggleSidebar} />
            <Header isMobile={isMobile} toggleSidebar={toggleSidebar} />
            <Main>
                <Outlet />
            </Main>
        </Layout>
    );
};

export default AppLayout;