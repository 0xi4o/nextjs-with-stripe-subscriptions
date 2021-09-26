import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import Stripe from 'stripe';

const createCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
        const { email, name } = req.body;

        const customer = await stripe.customers.create({
            email,
            name,
        });

        // Optional but recommended
        // Save the customer object or ID to your database

        res.status(200).json({
            code: 'customer_created',
            customer,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'customer_creation_failed',
            error: e,
        });
    }
};

const handler = nc({ attachParams: true }).post(createCustomer);

export default handler;