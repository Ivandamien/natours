const express = require('express');
// const reviewController = require('./../controllers/reviewController')
const reviewRouter = require('./../routes/reviewRoutes')

const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController')
const router = express.Router();

// router.param('id', tourController.checkID);
// Create a checkBody middleware
// Check if body contains the name and price property
// If not send back 400(bad request)
// Add it to the post handler stack

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year')
    .get(authController.protect,
        authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin)

// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances)

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);


router
    .route('/:id')
    .get(tourController.getTour)
    .patch(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.uploadTourImages,
        tourController.resizeTourImages,
        tourController.updateTour
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour
    )



router.use('/:tourId/reviews', reviewRouter)

module.exports = router;