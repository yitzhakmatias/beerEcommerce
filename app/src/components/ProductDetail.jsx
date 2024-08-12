import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Image,
    Text,
    Heading,
    Flex,
    Button,
    Tabs,
    TabList,
    Tab,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [stock, setStock] = useState({});
    const [selectedSku, setSelectedSku] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(response => {
                const product = response.data.find(p => p.id === parseInt(id));
                setProduct(product);
                if (product && product.skus.length > 0) {
                    setSelectedSku(product.skus[0].code);
                }
            })
            .catch(error => alert(error.message));
    }, [id]);

    useEffect(() => {
        if (product) {
            product.skus.forEach(sku => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/stock-price/${sku.code}`)
                    .then(response => {
                        setStock(prevState => ({ ...prevState, [sku.code]: response.data }));
                    })
                    .catch(error => alert(error.message));
            });
        }
    }, [product]);

    if (!product) return <Box>Loading...</Box>;

    const currentStock = stock[selectedSku] || {};

    const truncatedDescription = product.information.slice(0, 100) + '...';

    return (
        <Box p={4}>
            <Flex alignItems="center" mb={4}>
                <Button onClick={() => navigate(-1)} bg="transparent" _hover={{ bg: "transparent" }} mr={4}>
                    <ArrowBackIcon w={6} h={6} />
                </Button>
                <Heading as="h1" size="md">Detail</Heading>
            </Flex>

            <Box display="flex" justifyContent="center" mb={6}>
                <Image
                    src={product.image}
                    alt={product.name}
                    height="240px"
                    objectFit="contain"
                />
            </Box>

            <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Text fontSize="xl" fontWeight="bold">{product.brand}</Text>
                    <Text fontSize="xl" color="orange.400" fontWeight="bold">
                        ${currentStock.price ? (currentStock.price / 100).toFixed(2) : 'N/A'}
                    </Text>
                </Flex>

                <Flex alignItems="center" mb={4}>
                    <Text fontSize="sm" color="#969696" mr={2}>Origin: {product.origin}</Text>
                    <Text fontSize="sm" color="#969696">| Stock: {currentStock.stock || 'N/A'}</Text>
                </Flex>

                <Text fontSize="md" fontWeight="bold" mb={2}>Description</Text>
                <Text fontSize="sm" color="#969696" lineHeight="24px" mb={4}>
                    {showFullDescription ? product.information : truncatedDescription}
                    {!showFullDescription && (
                        <Button
                            variant="link"
                            color="orange.400"
                            fontWeight="bold"
                            onClick={() => setShowFullDescription(true)}
                        >
                            Read more
                        </Button>
                    )}
                </Text>
                <Tabs variant="unstyled" onChange={(index) => setSelectedSku(product.skus[index].code)} mb={4}>
                    <TabList >
                        {product && product.skus.map(sku => (
                            <Tab
                                key={sku.code}
                                bg={selectedSku === sku.code ? "orange.400" : "gray.200"}
                                color={selectedSku === sku.code ? "white" : "black"}
                                borderRadius="full"
                                px={4}
                                py={2}
                                _selected={{ color: "white", bg: "orange.400" }}
                                mx={1}  // Add spacing between tabs
                            >
                                {sku.name}
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>

                <Button
                    width="full"
                    mt={4}
                    bg="orange.400"
                    color="white"
                    size="lg"
                    _hover={{ bg: "orange.500" }}
                >
                    Add to cart
                </Button>
            </Box>
        </Box>
    );
}

export default ProductDetail;
