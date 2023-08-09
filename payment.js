const form = document.getElementById('paymentForm');
const payButton = document.getElementById('payButton');
const amount = document.getElementById('amount');


payButton.addEventListener('click', CreatePaymentMethod);

async function CreatePaymentMethod(e) {
    e.preventDefault();
    
    const{paymentMethod, error} = await stripe.createPaymentMethod(
        'card', cardElement, {
            billing_details:{
                "name": "Jibon",
                "email": "jibonroy282@gmail.com",
                "phone": "+8801782851242"
            }
        }
    );

    if(error){
        const displayError = document.getElementById('cardErrors');
        displayError.textContent = error.message;
    }else{
        const tokenInput = document.getElementById('paymentMethod');
        tokenInput.value = paymentMethod.id;
        createPaymentIntent()
    }

    async function createPaymentIntent(){
        await axios.post('https://api.stripe.com/v1/payment_intents',{
            amount: amount.value,
            currency:'usd',
            payment_method: paymentMethod.id,
            confirmation_method: 'automatic'
        },{
            headers:{
                "Authorization": "Bearer " + 'sk_test_51NGbtWL6EDqw6EU4m8BgCYZhlpcUKh5UAX3z1IXsmXpOSKpWKHq8pLIC7vienCdL7wOZNQcE3UtKvSKtOUL2LRjA00Plcu9GXl',
                "Content-Type": "application/x-www-form-urlencoded"
            }

        })
        .then(function (response) {
            console.log(response);
            comfirmPaymentIntent(response)
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async function comfirmPaymentIntent(response){
        await axios.post('https://api.stripe.com/v1/payment_intents/' + response.data.id + '/confirm', {},{
            headers:{
                "Authorization": "Bearer " + 'sk_test_51NGbtWL6EDqw6EU4m8BgCYZhlpcUKh5UAX3z1IXsmXpOSKpWKHq8pLIC7vienCdL7wOZNQcE3UtKvSKtOUL2LRjA00Plcu9GXl',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response)
        {
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
}