import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { BookingsDashboardPage } from '../../../pages/bookingsDashboard';
import { url } from 'inspector';
import { ActivityCalendarPage } from '../../../pages/activityCalendar';
import { CheckoutPage } from '../../../pages/checkout';

let dashboard: BookingsDashboardPage;
let calendar: ActivityCalendarPage;

test.describe('activities', () => {
    test.beforeEach(async ({ page }) => {
        dashboard = new BookingsDashboardPage(page);
        calendar = new ActivityCalendarPage(page, 'gym-bournemouth', 's-fast');
        // navigate to dashboard before each test
        await dashboard.navigate();
    });

    test.describe('unauthenticated', () => {
        test('customer cannot book activities without authenticating', async ({ page }) => {
            await expect(dashboard.myAccountBtn).not.toBeVisible();
            await dashboard.navigateToActivityCalendar();
            await page.locator('a[href="/location/gym-bournemouth/s-fast/2024-02-23/by-time/class/962053"]').click();
            await page.locator('[data-dusk="increase-quantity-button"]').first().click();
            await page.getByText('Book now').click();
            await expect(dashboard.notificationToast).toBeVisible();
            await expect(dashboard.notificationToast).toHaveText('Unauthenticated.');
        });
    });

    test.describe('authenticated', () => {
        test.beforeEach(async ({ page }) => {
            // go to dashboard and login before each test
            await dashboard.navigate();
            await dashboard.login();
        });

        test('customer can navigate to activity calendar', async ({ page }) => {
            await dashboard.navigateToActivityCalendar();
            await expect(page.url()).toBe('https://bookings.my-centre.co.uk/location/gym-bournemouth/s-fast/2024-02-23/by-time');
        });

        // test('customer can book an activity', async ({ page }) => {
        //     const checkout = new CheckoutPage(page);

        //     await expect(dashboard.myAccountBtn).toBeVisible();
        //     await dashboard.navigateToActivityCalendar();
        //     await page.locator('a[href="/location/gym-bournemouth/s-fast/2024-02-23/by-time/class/962053"]').click();
        //     await page.locator('[data-dusk="increase-quantity-button"]').first().click();
        //     await page.getByText('Book now').click();
        //     await page.waitForURL(checkout.url)
        //     await checkout.questionOne.fill('Simon');
        //     await checkout.questionOne.selectOption('Yes');
        // });
    });
});