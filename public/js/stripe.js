import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
    'pk_test_51LYTt9KkoLkYGxM21aTFwusqnSrxYIOKHank4iOBDCOGmAU8tnazWOJveEtvBsjP86Z3YbV7jeW2ABs84COUzHeA00ORRiVBoj'
);


export const bookTour = async(tourId) => {
    try {
        // 1) Get checkout session from API
        const session = await axios(
            `/api/v1/bookings/checkout-session/${tourId}`
        );
        console.log(session);
        // 2 Create checkout form + charge credi card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};
// var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');