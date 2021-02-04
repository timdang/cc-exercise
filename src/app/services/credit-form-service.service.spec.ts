import { TestBed } from '@angular/core/testing';

import { CreditFormService } from './credit-form-service.service';

describe('CreditFormServiceService', () => {
  let service: CreditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate Amex cards', () => {
    const case1 = '43423-423423-3424';
    expect(CreditFormService.isAmericanExpress(case1)).toBeTrue();
    expect(CreditFormService.isVisaCard(case1)).toBeFalse();
    expect(CreditFormService.isValidCardNumber(case1)).toBeTrue();
  });

  it('validate Visa cards', () => {
    const case2 = '3743-3437-3438-3472';
    expect(CreditFormService.isAmericanExpress(case2)).toBeTrue();
    expect(CreditFormService.isVisaCard(case2)).toBeFalse();
    expect(CreditFormService.isValidCardNumber(case2)).toBeTrue();
  });
});
