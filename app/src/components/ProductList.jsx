import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Box,
    Image,
    Text,
    Grid,
    Button,
    Flex,
} from '@chakra-ui/react';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => alert(error.message));
    }, []);

    return (
        <Box>
            <Text as="h1" textAlign="left" mb={8} fontSize="x-large" fontWeight="bold">Welcome Back!</Text>
            <Text as="h1" textAlign="left" mb={8} fontSize="large" fontWeight="bold">Our Products</Text>
            <Grid templateColumns="repeat(auto-fit, minmax(155px, 1fr))" gap={6} justifyContent="center">
                {products.map(product => (
                    <Link to={`/product/${product.id}/${product.brand.toLowerCase().replace(/ /g, '-')}`} key={product.id}>
                        <Box
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                            overflow="hidden"
                            p={2}
                            textAlign="center"
                            width="155px"
                            height="195px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {/* Product Name */}
                            <Text mb={2} fontFamily="DM Sans" fontSize="16px" lineHeight="16px" textAlign="left" fontWeight="bold">{product.brand}</Text>

                            {/* Image */}
                            <Box
                                width="122px"
                                height="122px"
                                overflow="hidden"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mb={2}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    height="122px"
                                    objectFit="contain"
                                />
                            </Box>

                            {/* Bottom section with Price and Plus button */}
                            <Flex width="100%" justifyContent="space-between" alignItems="center" px={2}>
                                <Text color="black" fontWeight="bold">${product.price?.toFixed(2)}</Text>
                                <Button size="sm" colorScheme="orange">+</Button>
                            </Flex>
                        </Box>
                    </Link>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
