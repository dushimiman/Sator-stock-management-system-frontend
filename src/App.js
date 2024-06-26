
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Layout from './components/Layout';
import Home from './pages/HomePage';
import AddItem from './pages/AddItem'
import  NavigationBar  from './components/Navbar'

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token'); 

    return (
        <Router>
            <Layout>
            <Routes>
            
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Home /> : <Navigate to="/login" />
                    }
                />
                  <Route
                    path="/add-item"
                    element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />}
                />
                  <Route path="/login" element={<NavigationBar />} />
            </Routes>
            </Layout>
        </Router>
    );
};

export default App;
