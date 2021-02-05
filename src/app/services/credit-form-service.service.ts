import { Injectable } from '@angular/core';

import { CreditForm } from '../models/creditCardForm';

@Injectable({
  providedIn: 'root',
})
export class CreditFormService {
  public static isAmericanExpress(val: any): boolean {
    const numberString: string = val?.toString();
    return numberString?.startsWith('34') || numberString?.startsWith('37');
  }

  public static isVisaCard(val: any): boolean {
    const numberString: string = val?.toString();
    return numberString?.startsWith('4');
  }

  public static isValidCardNumber(val: any): boolean {
    const numberString: string = val?.toString();
    return (
      formRegex.cardNumber.test(val) &&
      ((CreditFormService.isAmericanExpress(val) &&
        numberString.length === 17) ||
        (CreditFormService.isVisaCard(val) && numberString.length === 19))
    );
  }

  public static validateCardNumber(creditForm: CreditForm): CreditForm {
    const validatedForm = { ...creditForm };
    if (validatedForm.cardNumber) {
      validatedForm.cardNumber.isValid = CreditFormService.isValidCardNumber(
        creditForm.cardNumber.value
      );
    }
    return validatedForm;
  }

  public static isValidExpirationDate(creditForm: CreditForm): CreditForm {
    // I'd probably use a library like date-fns for moment.js
    const expYear: number =
      (creditForm?.expirationYear?.value &&
        +creditForm.expirationYear?.value) ||
      2020;
    const expMonth: number =
      (creditForm?.expirationMonth?.value &&
        +creditForm.expirationMonth.value) ||
      0;
    const expDate = new Date(expYear, expMonth, 0);
    const today = new Date();
    const firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const validatedForm = { ...creditForm };
    const validExpiration = expDate > firstOfTheMonth;
    if (validatedForm.expirationYear?.value) {
      validatedForm.expirationYear.isValid = validExpiration;
    }
    if (validatedForm.expirationMonth?.value) {
      validatedForm.expirationMonth.isValid =
        (validatedForm.expirationYear.value ? validExpiration : true) &&
        formRegex.month.test(validatedForm.expirationMonth?.value);
    }
    return validatedForm;
  }
}

export const formRegex = {
  month: /^(1[0-2]|0[1-9])$/,
  cardNumber: /^[0-9-]*$/,
};
