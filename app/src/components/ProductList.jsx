import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Box,
    Image,
    Text,
    Grid,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import {AddIcon} from "@chakra-ui/icons";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => alert(error.message));
    }, []);

    return (


        <Box p={4}>
            <Text as="h1" textAlign="left" fontSize="1xl"  mb={2}>
                Hi Mr. Michael,
            </Text>
            <Text as="h2" textAlign="left" fontSize="3xl" fontWeight="bold" mb={4}>
                Welcome Back!
            </Text>
            <Text as="h3" textAlign="left" fontSize="xl" fontWeight="bold" mb={4}>
                Our Products
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {products.map(product => (
                    <Link to={`/product/${product.id}/${product.brand.toLowerCase().replace(/ /g, '-')}`} key={product.id}>
                        <Box
                            bg="white"
                            borderRadius="lg"
                            boxShadow="lg"
                            p={4}
                            textAlign="center"
                            position="relative"
                            _hover={{ transform: 'scale(1.02)', transition: '0.3s' }}
                        >
                            <Text fontWeight="bold" fontSize="md" mb={2} noOfLines={1}>
                                {product.brand}
                            </Text>
                            <Image
                                src={product.image}
                                alt={product.name}
                                boxSize="100px"
                                objectFit="contain"
                                mx="auto"
                                mb={3}
                            />
                            <Flex justifyContent="space-between" alignItems="center" mt={2}>
                                <Text fontWeight="bold" fontSize="lg" color="black">
                                    ${product.price?.toFixed(2)}
                                </Text>
                                <IconButton
                                    icon={<AddIcon />}
                                    size="md"
                                    bg="orange.400"
                                    color="white"
                                    borderRadius="full"
                                    position="absolute"
                                    bottom="12px"
                                    right="12px"
                                    _hover={{ bg: "orange.500" }}
                                    _active={{ bg: "orange.600" }}
                                    aria-label="Add to cart"
                                />
                            </Flex>
                        </Box>
                    </Link>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
