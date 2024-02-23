import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { BookingsDashboardPage } from '../../../pages/bookingsDashboard';

describe('bookings index', () => {
    // Navigate to the homepage before each test
    test.beforeEach(async ({ page }) => {
        const indexPage = new BookingsDashboardPage(page);
        await indexPage.navigate();
    });

    test('customer can login with valid info', async ({ page }) => {
        const indexPage = new BookingsDashboardPage(page);
    
        await indexPage.login();
    });
    
    test('customer cannot login with invalid info', async ({ page }) => {
        const indexPage = new BookingsDashboardPage(page);
    
        await indexPage.loginBtn.click();
        await indexPage.populateUsernameField('invalid');
        await indexPage.populatePasswordField('invalid');
        await indexPage.loginFormSubmitBtn.click();
        await expect(indexPage.notificationToast).toBeVisible();
        await expect(indexPage.notificationToast).toHaveText('Invalid credentials');
    });

    test('customer can logout', async ({ page }) => {
        const indexPage = new BookingsDashboardPage(page);
    
        await indexPage.login();
        await indexPage.myAccountBtn.click();
        await indexPage.logoutBtn.click();
        await expect(indexPage.loginFormSubmitBtn).toBeVisible();
    });
});