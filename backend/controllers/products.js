const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Insert a new product
const createProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: { product_id, name, description, price, category, image_url }
        });
        res.status(200).json({
            status: 'ok',
            message: `Product with id ${product.product_id} is created successfully`
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
            error: err.message
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.json(products);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error retrieving products',
            error: err.message
        });
    }
};

// Get one product by ID
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: String(id) }
        });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Error retrieving product', error: err.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const existingProduct = await prisma.products.findUnique({
            where: { product_id: String(id) }
        });
        if (!existingProduct) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            await prisma.products.delete({ where: { product_id: String(id) } });
            res.status(200).json({ status: 'ok', message: `Product with id ${id} is deleted successfully` });
        }
    } catch (err) {
        console.error('Delete product error:', err);
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    const { id } = req.params;
    const data = {};

    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;
    if (image_url) data.image_url = image_url;

    if (Object.keys(data).length === 0) {
        res.status(400).json({ status: 'error', message: 'No data to update' });
    }
    try {
        const product = await prisma.products.update({
            data,
            where: { product_id: String(id) }
        });
        res.status(200).json({
            status: 'ok',
            message: `Product with id ${product.product_id} is updated successfully`,
            product
        });
    } catch (err) {
        if (err.code === 'P2002') {
            res.status(404).json({ status: 'error', message: 'Product already exists' });
        } else if (err.code === 'P2025') {
            res.status(404).json({ status: 'error', message: `Product with id ${id} not found` });
        } else {
            console.error('Update product error:', err);
            res.status(500).json({ status: 'error', message: 'Error while updating the product' });
        }
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
};
