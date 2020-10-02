const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.get('/products/:productId', shopController.getProduct)
router.post('/cart-delete-item', shopController.postCartDeleteItem)
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/', shopController.getIndex);

module.exports = router;