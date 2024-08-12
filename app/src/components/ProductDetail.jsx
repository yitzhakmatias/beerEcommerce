import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Image,
    Text,
    Heading,
    Flex,
    IconButton,
    Tabs,
    TabList,
    Tab
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function ProductDetail() {
    const { id, brand } = useParams();
    const navigate = useNavigate(); // For back button navigation
    const [product, setProduct] = useState(null);
    const [stock, setStock] = useState({});
    const [selectedSku, setSelectedSku] = useState(null); // Track the selected SKU

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(response => {
                const product = response.data.find(p => p.id === parseInt(id));
                setProduct(product);
                if (product && product.skus.length > 0) {
                    setSelectedSku(product.skus[0].code); // Default to the first SKU
                }
            })
            .catch(error => alert(error.message));
    }, [id]);

    useEffect(() => {
        if (product) {
            const interval = setInterval(() => {
                product.skus.forEach(sku => {
                    axios.get(`${process.env.REACT_APP_API_URL}/api/stock-price/${sku.code}`)
                        .then(response => {
                            setStock(prevState => ({ ...prevState, [sku.code]: response.data }));
                        })
                        .catch(error => alert(error.message));
                });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [product]);

    if (!product) return <Box>Loading...</Box>;

    const currentStock = stock[selectedSku] || {};

    return (
        <Box p={4} bg="white" borderRadius="md" boxShadow="md">
            {/* Top Container with Back Button and Detail Heading */}
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                />
                <Heading as="h1" textAlign="center" flex="1">Detail</Heading>
            </Flex>

            {/* Centered Image */}
            <Box display="flex" justifyContent="center" mb={4}>
                <Image src={product.image} alt={product.name} height="240px" objectFit="cover" />
            </Box>

            {/* Bottom Card with Product Details */}
            <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
                    <Text fontSize="lg" color="green.600" fontWeight="bold">
                        ${currentStock.price ? (currentStock.price / 100).toFixed(2) : 'N/A'}
                    </Text>
                </Flex>

                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Text>Origin: {product.origin}</Text>
                    <Text>Stock: {currentStock.stock || 'N/A'}</Text>
                </Flex>

                <Text mb={4}>{product.information}</Text>

                {/* SKU Tabs */}
                <Tabs onChange={(index) => setSelectedSku(product.skus[index].code)} mb={4}>
                    <TabList>
                        {product.skus.map((sku) => (
                            <Tab key={sku.code}>{sku.name}</Tab>
                        ))}
                    </TabList>
                </Tabs>
            </Box>
        </Box>
    );
}

export default ProductDetail;
