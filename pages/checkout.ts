import { expect, type Page, type Locator } from '@playwright/test';

export class CheckoutPage {

    readonly page: Page;
    readonly url: string;
    readonly qName: Locator;
    readonly qEmergencyNumber: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://bookings.my-centre.co.uk/basket/checkout';

        this.qName = this.page.locator('#act_question1');
        this.qEmergencyNumber = this.page.locator('#act_question2');
    }
}