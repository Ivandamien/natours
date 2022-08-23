// const catchAsync = require('./../utils/catchAsync')
// const AppError = require('./../utils/appError')
const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory')




// exports.getAllReviews = catchAsync(async(req, res, next) => {

//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };

//     const reviews = await Review.find(filter);

//     res.status(200).json({
//         status: 'success',
//         results: reviews.length,
//         data: {
//             reviews
//         }
//     })

// });


exports.setTourUserIds = (req, res, next) => {
    // Allow nested Routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review)
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

// exports.getReview = catchAsync(async(req, res, next) => {
//     const review = await Review.findById(req.params.id);
//     if (!review) {
//         return next(new AppError('No review found with that ID', 404))
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             review
//         }
//     })
// })

// exports.updateReview = catchAsync(async(req, res, next) => {
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//     if (!review) {
//         return next(new AppError('No review found with that ID', 404))
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             review
//         }
//     })

// })


// exports.deleteReview = catchAsync(async(req, res, next) => {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) {
//         return next(new AppError('No review found with that ID', 404))
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// }).