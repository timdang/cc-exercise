import { Component, Input } from '@angular/core';

import { CardType } from '../credit-card-form.component';

@Component({
  selector: 'app-credit-card-icons',
  templateUrl: './credit-card-icons.component.html',
  styleUrls: ['./credit-card-icons.component.scss'],
})
export class CreditCardIconsComponent {
  @Input() public cardType: CardType = CardType.Other;
  public CardType = CardType;
}
