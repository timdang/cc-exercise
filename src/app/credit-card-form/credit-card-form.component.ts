import { Component, EventEmitter, Output } from '@angular/core';

import { CreditForm } from '../models/creditCardForm';
import {
  CreditFormService,
  formRegex,
} from '../services/credit-form-service.service';

export enum CardType {
  Amex,
  Visa,
  Other,
}

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss'],
})
export class CreditCardFormComponent {
  @Output() cardSubmission = new EventEmitter<CreditForm>();
  public cardType: CardType = CardType.Other;
  public CardType = CardType;
  public formValid = false;
  public formRegex = formRegex;
  public formSubmitting = false;

  public creditCard: CreditForm = {
    cvv2: { value: null, isValid: false },
    cardholder: { value: null, isValid: false },
    expirationMonth: { value: null, isValid: false },
    expirationYear: { value: null, isValid: false },
    cardNumber: { value: null, isValid: false },
  };

  onCardNumberKeypress(cardNumber: string): void {
    this.formatCardNumber(cardNumber);
    this.updateCardType(cardNumber);
  }

  validateCardholder(cardholder: string): void {
    // Depending on complexity of this logic, move to service
    this.creditCard.cardholder.isValid = cardholder?.length > 2;
    this.validateForm();
  }

  validateCVV2Length(cvv2: string): void {
    // Depending on complexity of this logic, move to service
    this.creditCard.cvv2.isValid =
      this.cardType === CardType.Amex ? cvv2?.length === 4 : cvv2?.length === 3;
    this.validateForm();
  }

  validateExpirationDate(): void {
    this.creditCard = CreditFormService.isValidExpirationDate(this.creditCard);
    this.validateForm();
  }

  validateCreditCardNumber(): void {
    this.creditCard = CreditFormService.validateCardNumber(this.creditCard);
    this.validateForm();
  }

  validateForm(): void {
    this.formValid =
      this.creditCard.cardNumber.isValid &&
      this.creditCard.cardholder.isValid &&
      this.creditCard.cvv2.isValid &&
      this.creditCard.expirationMonth.isValid &&
      this.creditCard.expirationYear.isValid;
  }

  onSubmission(): void {
    this.cardSubmission.next(this.creditCard);
    this.formSubmitting = true;
  }

  private updateCardType(cardNumber: string): void {
    const isAmex = CreditFormService.isAmericanExpress(cardNumber);
    const isVisa = CreditFormService.isVisaCard(cardNumber);
    this.cardType = isAmex
      ? CardType.Amex
      : isVisa
      ? CardType.Visa
      : CardType.Other;
  }

  private formatCardNumber(cardNumber: string): void {
    const cardNumberLength = cardNumber.length;
    if (CreditFormService.isAmericanExpress(cardNumber)) {
      this.formatAmexCardNumber(cardNumber);
    } else {
      this.formatVisaCardNumber(cardNumber);
    }
  }

  private formatVisaCardNumber(cardNumber: string): void {
    if ([5, 10, 15].includes(cardNumber.length)) {
      const formattedString =
        cardNumber.substring(0, cardNumber.length - 1) +
        '-' +
        cardNumber.substring(cardNumber.length - 1);
      this.creditCard.cardNumber.value = formattedString;
    }
  }

  private formatAmexCardNumber(cardNumber: string): void {
    if ([5, 12, 13].includes(cardNumber.length)) {
      const formattedString =
        cardNumber.substring(0, cardNumber.length - 1) +
        '-' +
        cardNumber.substring(cardNumber.length - 1);
      this.creditCard.cardNumber.value = formattedString;
    }
  }
}
