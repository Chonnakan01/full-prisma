const express =  require('express');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 3, 
    max: 100,
    message : ' you have exceeded the 100 requests in 3 minutes limit!',
});

const router = express.Router();
const customerController = require('../controllers/customers');

router.post('/customers', apiLimiter, customerController.createCustomer);
router.put('/customers/:id',  customerController.updateCustomer);
router.delete('/customers/:id',  customerController.deleteCustomer);
router.get('/customers/:id',  customerController.getCustomer);
router.get('/customers',  customerController.getCustomers);

module.exports = router;