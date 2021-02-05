export interface CreditForm {
  cvv2: CreditCardFormElement;
  cardholder: CreditCardFormElement;
  expirationMonth: CreditCardFormElement;
  expirationYear: CreditCardFormElement;
  cardNumber: CreditCardFormElement;
}

interface CreditCardFormElement {
  value: string | null;
  isValid: boolean;
}
