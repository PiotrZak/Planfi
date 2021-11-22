import React from 'react'
import ReactDOM from 'react-dom'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import GlobalTemplate from 'templates/GlobalTemplate'
import { paymentService } from 'services/paymentService'
import { useHistory } from 'react-router-dom'

const stripePromise = loadStripe(
  'pk_test_51JibLGHOFtiwRajcCOgyocEKJRu0u5IihfcnagHzodxdaEVNxmvaIXMpOHBldgouqeqBPqhfipanwGTID4yhPRvl003T4ULBVP'
)

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (elements == null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
    </form>
  )
}

export const StripeContainer = () => {
  const startPayment = () => {
    const data = {
      Url: window.location.href.toString(),
    }

    paymentService
      .checkoutStripe(data)
      .then((data) => {
        window.open(data, '_blank')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <GlobalTemplate>
      <html>
        <head>
          <title>Buy plan for your organization</title>
        </head>
        <body>
          <button onClick={() => startPayment()} type="submit">
            Checkout
          </button>
        </body>
      </html>
    </GlobalTemplate>
  )
}
