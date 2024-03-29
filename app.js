const path = require('path')
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const bookingController = require('./controllers/bookingController')
const viewRouter = require('./routes/viewRoutes')

const app = express();

app.enable('trust proxy');

app.use(cors({
    origin: "*",
}))


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// 1) GLOBAL MIDDLEWARES

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Set security HTTP headers
// app.use(helmet())
// app.use(helmet({ contentSecurityPolicy: false }))
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: {
            allowOrigins: ['*']
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['*'],
                scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"]
            }
        }
    })
)


// Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

}


// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'

});
app.use('/api', limiter)

// Stripe webhook, before body-parser, because stripe needs the body as stream
app.post(
    '/webhook-checkout',
    express.raw({ type: 'application/json' }),
    bookingController.webhookCheckout
);



// Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())


// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

app.use(compression())
    // Test middleware
    // app.use((req, res, next) => {
    //     console.log('Hello from the middleware👋👋👋');
    //     next();
    // })

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies)
    next();
})


// app.use((req, res, next) => {
//     res.setHeader(
//         'Content-Security-Policy',
//         "script-src 'self' api.mapbox.com",
//         "script-src-elem 'self' api.mapbox.com",
//     );
//     next();
// });



// route handlers

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', updateTour);
// app.patch('/api/v1/tours/:id', createTour)
// app.delete('/api/v1/tours/:id', deleteTour)


// Routes


app.use('/', viewRouter)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Error handling middlewares

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`

    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler)

module.exports = app;