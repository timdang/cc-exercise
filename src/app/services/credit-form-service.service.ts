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
      (CreditFormService.isAmericanExpress(val) &&
        numberString.length === 15) ||
      (CreditFormService.isVisaCard(val) && numberString.length === 16)
    );
  }

  public static isValidExpirationDate(card: Partial<CreditForm>): boolean {
    // I'd probably use a library like date-fns for moment.js
    const expYear: number =
      card && card.expirationYear ? +card.expirationYear : 2020;
    const expMonth: number =
      card && card.expirationMonth ? +card.expirationMonth : 1;
    const expDate = new Date(expYear, expMonth, 0);
    const today = new Date();
    const firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    return expDate > firstOfTheMonth;
  }
}

export const formRegex = {
  month: '^(1[0-2]|[1-9])$',
  year: '^(20)d{2}$',
};
