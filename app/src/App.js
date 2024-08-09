import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

function App() {
    return (
        <Box p={4}>
            <Router>
                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id/:brand" element={<ProductDetail />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
