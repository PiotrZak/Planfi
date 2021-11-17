import { http } from "./http.service";
import { PAYMENTS_URL } from "./utils"

export const paymentService = {
  checkoutStripe,
  };

  function checkoutStripe(body) {
    return http.post(`${PAYMENTS_URL}/checkoutSession`, body);
  }
