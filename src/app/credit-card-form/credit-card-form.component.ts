import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public formInvalid = true;
  public formRegex = formRegex;

  public creditCard: CreditForm = {
    cvv2: null,
    cardholder: null,
    expirationMonth: null,
    expirationYear: null,
    cardNumber: null,
  };

  onCardNumberKeypress(cardNumber: string): void {
    this.updateCardType(cardNumber);
    this.formatCardNumber(cardNumber);
  }

  updateCardType(cardNumber: string): void {
    const isAmex = CreditFormService.isAmericanExpress(cardNumber);
    const isVisa = CreditFormService.isVisaCard(cardNumber);
    this.cardType = isAmex
      ? CardType.Amex
      : isVisa
      ? CardType.Visa
      : CardType.Other;
  }

  formatCardNumber(cardNumber: string): void {
    const cardNumberLength = cardNumber.length;
    if (CreditFormService.isAmericanExpress(cardNumber)) {
      if ([5, 12, 13].includes(cardNumber.length)) {
        const formattedString =
          cardNumber.substring(0, cardNumber.length - 1) +
          '-' +
          cardNumber.substring(cardNumber.length - 1);
        this.creditCard.cardNumber = formattedString;
      }
    } else {
      if ([5, 10, 15].includes(cardNumber.length)) {
        const formattedString =
          cardNumber.substring(0, cardNumber.length - 1) +
          '-' +
          cardNumber.substring(cardNumber.length - 1);
        this.creditCard.cardNumber = formattedString;
      }
    }
  }

  validateExpirationDate(): boolean {
    return CreditFormService.isValidExpirationDate(this.creditCard);
  }
}
