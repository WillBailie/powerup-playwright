import { test, expect } from '@playwright/test';
import { BookingsDashboardPage } from '../../../pages/bookingsDashboard';
import { describe } from 'node:test';

describe('bookings dashboard', () => {
    let dashboard: BookingsDashboardPage;
    test.beforeEach(async ({ page }) => {
        // Define a reuable instance of the page
        dashboard = new BookingsDashboardPage(page);

        // navigate and login to homepage before each test
        await dashboard.navigate();
        await dashboard.login();
    });

    test('customer can select a centre', async ({ page }) => {
        await dashboard.selectVenue();
    });

    test('customer can change centre', async ({ page }) => {
        await dashboard.selectVenue();
        await dashboard.changeLocationBtn.click();
        await expect(dashboard.venueList).toBeVisible();
        await dashboard.populateVenueSearchField('Better Gym Teddington');
        await dashboard.venueCard.click();
        await expect(dashboard.selectedVenue).toHaveText('Better Gym Teddington');
    });

    test('customer cannot book an activity before selecting a centre', async ({ page }) => {
        await expect(dashboard.selectedVenue).not.toBeVisible();
        await expect(dashboard.venueList).toBeVisible();
        await dashboard.bookAnActivityBtn.click();
        await expect(dashboard.notificationToast).toBeVisible();
        await expect(dashboard.notificationToast).toHaveText('Please select a venue before booking an activity');
    });
});