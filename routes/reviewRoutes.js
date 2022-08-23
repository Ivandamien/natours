const express = require('express');
const authController = require('./../controllers/authController')
const reviewController = require('./../controllers/reviewController')

const router = express.Router({ mergeParams: true });

router.use(authController.protect)

router.get('/', reviewController.getAllReviews);
router.post('/', authController.restrictTo('user'), reviewController.setTourUserIds, reviewController.createReview);

router.get('/:id', reviewController.getReview)
router.patch('/:id', authController.restrictTo('user', 'admin'), reviewController.updateReview)
router.delete('/:id', authController.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;