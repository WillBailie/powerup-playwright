import { expect, type Page, type Locator } from '@playwright/test';

export class ActivityCalendarPage {
    readonly page: Page;
    readonly url: string;
    readonly venue: string;
    readonly category: string;

    constructor(page: Page, venue: string, category: string) {
        this.page = page;
        this.url = 'https://bookings.my-centre.co.uk/location/' + venue + '/' + category + '/2024-02-23/by-time';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async updateCalendarDate(date: string) {
        await this.page.click('href="/location/' + this.venue + '/' + this.category + '/' + date + '/by-time"');
    }
}
