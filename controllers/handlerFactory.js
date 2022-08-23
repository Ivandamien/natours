const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async(req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    })

});


exports.updateOne = Model => catchAsync(async(req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})


exports.createOne = Model => catchAsync(async(req, res, next) => {
    const doc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        },
    })
})


exports.getOne = (Model, popOptions) => catchAsync(async(req, res, next) => {

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions)
    const doc = await query


    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });

});


exports.getAll = Model => catchAsync(async(req, res, next) => {

    // EXECUTE QUERY
    // To allow for nexted get reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND QUERY
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc,
        },
    });

})





// exports.getAllTours = catchAsync(async(req, res, next) => {

//     // try {
//     // console.log(req.query);

//     // // BUILD QUERY
//     // // 1A) Filtering
//     // const queryObj = {...req.query };
//     // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     // excludedFields.forEach(el => delete queryObj[el])

//     // // 1B) Advanced filtering

//     // let queryStr = JSON.stringify(queryObj);
//     // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//     // console.log(JSON.parse(queryStr))

//     // // {difficulty:'easy',duration:{$gte:5}}
//     // // { difficulty: 'easy', duration: { gte: '5' } }
//     // // gte,gt,lte,lt

//     // let query = Tour.find(JSON.parse(queryStr));

//     // // 2) SORTING
//     // if (req.query.sort) {
//     //     const sortBy = req.query.sort.split(',').join(' ');
//     //     console.log(sortBy)
//     //     query = query.sort(sortBy);
//     //     // sort('price ratingAverage')
//     // } else {
//     //     query = query.sort('-createdAt');
//     // }

//     // // 3) Field limiting
//     // if (req.query.fields) {
//     //     const fields = req.query.fields.split(',').join(' ');
//     //     query = query.select(fields)
//     // } else {
//     //     query = query.select('-__v');
//     // }

//     // // 4) Pagination
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 100;
//     // const skip = (page - 1) * limit
//     //     // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
//     // query = query.skip(skip).limit(limit);
//     // if (req.query.page) {
//     //     const numTours = await Tour.countDocuments();
//     //     if (skip >= numTours) throw new Error('This page does not exist');
//     // }
//     // EXECUTE QUERY
//     const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();
//     const tours = await features.query;
//     // const tours = await query;
//     // console.log(req.query, queryObj);

//     // Special moongoose queries

//     // const tours = await Tour.find({
//     //     duration: 5,
//     //     difficulty: 'easy'
//     // })

//     // const tours = await Tour.find()
//     //     .where('duration')
//     //     .equals(5)
//     //     .where('difficulty')
//     //     .equals('easy');





//     // SEND QUERY
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours,
//         },
//     });
//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: "fail",
//     //         message: err
//     //     })
//     // }
// })



// exports.getTour = catchAsync(async(req, res, next) => {
//     // try {
//     const tour = await Tour.findById(req.params.id).populate('reviews');
//     // Tour.findOne({_id:req.params.id})

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }
//     res.status(200).json({
//         status: 'success',

//         data: {
//             tours: tour,
//         },
//     });
//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: "fail",
//     //         message: err
//     //     })
//     // }


// });


// exports.createTour = catchAsync(async(req, res, next) => {
//     const newTour = await Tour.create(req.body)
//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: newTour,
//         },
//     });

// try {
//     // const newTour = new Tour({});
//     // newTour.save();


// } catch (err) {
//     res.status(400).json({
//         status: 'fail',
//         message: err
//     })
// }


// });


// exports.updateTour = catchAsync(async(req, res, next) => {
//     // try {

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: tour
//         }
//     })

// } catch (err) {
//     res.status(404).json({
//         status: "fail",
//         message: err
//     })
// }
// })


// exports.updateTour = catchAsync(async(req, res, next) => {
//     // try {

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: tour
//         }
//     })

// } catch (err) {
//     res.status(404).json({
//         status: "fail",
//         message: err
//     })
// }
// })

// exports.updateTour = catchAsync(async(req, res, next) => {
//     // try {

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: tour
//         }
//     })

// } catch (err) {
//     res.status(404).json({
//         status: "fail",
//         message: err
//     })
// }
// })


// exports.deleteTour = catchAsync(async(req, res, next) => {
//     // try {
//     const tour = await Tour.findByIdAndDelete(req.params.id);

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(204).json({
//             status: 'success',
//             data: null
//         })
//         // } catch (err) {
//         //     res.status(404).json({
//         //         status: "fail",
//         //         message: err
//         //     })
//         // }
// });ffffffff