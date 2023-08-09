const stripe = Stripe('pk_test_51NGbtWL6EDqw6EU4OxgKxZLfiULcOpePVkQ5Zg2giMNCTMzKTAA2jNQKa6HMcRKHwsGxMFvVgudR5YQElTp1o7m400zHjaVAMP');

const elements = stripe.elements({
    locale: 'en'
});

const cardElement = elements.create('card');

cardElement.mount('#cardElement');



//................................

