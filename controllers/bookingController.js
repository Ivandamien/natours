const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require('./../models/tourModel');
const User = require('../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')



exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    // 1) Get the coy booked tour
    const tour = await Tour.findById(req.params.tourId)
        // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/my-tours?alert=booking`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        // line_items: [{
        //     name: `${tour.name} Tour`,
        //     description: tour.summary,
        //     images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        //     amount: tour.price * 100,
        //     currency: 'usd',
        //     quantity: 1
        // }]
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${tour.name} Tour`,
                    description: tour.summary,
                    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                },
                unit_amount: tour.price * 100,
            },
            quantity: 1

        }],
        mode: 'payment',

        //     line_items: [{
        //     price_data: {
        //         currency: 'usd',
        //         product_data: {
        //             name: 'T-shirt',
        //         },
        //         unit_amount: 2000,
        //     },
        //     quantity: 1,
        // }, ],
        // mode: 'payment',
        // success_url: 'https://example.com/success',
        // cancel_url: 'https://example.com/cancel',
        // line_items.name: `${tour.name} Tour`,

    })

    // 3) Create session as as response
    res.status(200).json({
        status: 'success',
        session
    })
})


exports.createBookingCheckout = catchAsync(async(req, res, next) => {
    const { tour, user, price } = req.query;

    if (!tour && !price && !user) return next();

    await Booking.create({ tour, user, price });

    res.redirect(originalUrl.split('?')[0])
        // next();
})




exports.createBooking = factory.createOne(Booking)
exports.getBooking = factory.getOne(Booking)
exports.getAllBookings = factory.getAll(Booking)
exports.updateBooking = factory.updateOne(Booking)
exports.deleteBooking = factory.deleteOne(Booking)