import { expect, type Page, type Locator } from '@playwright/test';
import { ActivityCalendarPage } from './activityCalendar';

export class BookingsDashboardPage {
    readonly page: Page;
    readonly url: string;
    readonly welcomeText: Locator;
    readonly venueSearch: Locator;
    readonly loginBtn: Locator;
    readonly loginFormSubmitBtn: Locator;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly username: string;
    readonly password: string;
    readonly myAccountBtn: Locator;
    readonly notificationToast: Locator;
    readonly logoutBtn: Locator;
    readonly venueList: Locator;
    readonly venueCard: Locator;
    readonly venueName: Locator;
    readonly venueAddress: Locator;
    readonly selectedVenue: Locator;
    readonly changeLocationBtn: Locator;
    readonly bookAnActivityBtn: Locator;
    readonly activityCategoryBtn: Locator;
    
    constructor(page: Page) {
        this.page = page;

        // Locators
        this.welcomeText = this.page.locator('[data-testid="welcome"]');
        this.venueSearch = this.page.locator('[data-testid="search-venue"] input');
        this.loginBtn = this.page.locator('[data-testid="login"]');
        this.userNameField = this.page.locator('[name="username"]');
        this.passwordField = this.page.locator('[name="password"]');
        this.myAccountBtn = this.page.locator('[data-testid="my-account"]') ;
        this.loginFormSubmitBtn = this.page.locator('[data-testid="log-in"]');
        this.notificationToast = this.page.locator('[data-dusk="notification-toast"]');
        this.logoutBtn = this.page.getByText('Log out');
        this.venueList = this.page.locator('[data-testid="venue-list"]');
        this.venueCard = this.page.locator('[data-testid="venue-card"]');
        this.venueName = this.page.locator('[data-testid="venue-name"]');
        this.venueAddress = this.page.locator('[data-testid="venue-address"]');
        this.selectedVenue = this.page.locator('[data-testid="selected-venue"]');
        this.changeLocationBtn = this.page.locator('button[type="button"]');
        this.bookAnActivityBtn = this.page.getByRole('link', { name: 'Book an activity' });
        this.activityCategoryBtn = this.page.getByText('Steph');

        // Data
        this.username = 'simon@auto.com';
        this.password = 'Openplay123!';
        this.url = 'https://bookings.my-centre.co.uk/';
    }
    
    async navigate() {
        await this.page.goto(this.url);
    }
    
    async isPageTitleVisible() {
        await expect(this.welcomeText).toBeVisible();
    }
    
    async isPageTitleCorrect() {
        await expect(this.welcomeText).toHaveText('Welcome to the Better customer portal');
    }

    async isVenueSearchVisible() {
        await expect(this.venueSearch).toBeVisible();
    }

    async isLoginBtnVisible() {
        await expect(this.loginBtn).toBeVisible();
    }

    async populateUsernameField(username: string) {
        await this.userNameField.fill(username);
    }

    async populatePasswordField(password: string) {
        await this.passwordField.fill(password);
    }

    async populateVenueSearchField(venue: string) {
        await this.venueSearch.fill(venue);
    }

    async login() {
        await this.loginBtn.click();
        await this.populateUsernameField(this.username);
        await this.populatePasswordField(this.password);
        await this.loginFormSubmitBtn.click();
        await expect(this.myAccountBtn).toBeVisible();
        await expect(this.loginBtn).not.toBeVisible();
    }

    async selectVenue() {
        await this.populateVenueSearchField('Better Gym Bournemouth')
        await expect(this.venueName).toHaveText('Better Gym Bournemouth');
        await expect(this.venueAddress).toHaveText('The Undercroft Area, St Pauls road BH8 8DL');
        await this.page.getByText('Better Gym Bournemouth').click();
        await expect(this.venueList).not.toBeVisible();
        await expect(this.selectedVenue).toHaveText('Better Gym Bournemouth');
    }

    async navigateToActivityCalendar() {
        const calendar = new ActivityCalendarPage(this.page, 'gym-bournemouth', 's-fast');
        
        await this.populateVenueSearchField('Better Gym Bournemouth')
        await this.page.getByText('Better Gym Bournemouth').click();
        await this.bookAnActivityBtn.click();
        await this.activityCategoryBtn.click();
        await this.page.getByText('S Fast').click();
        await this.page.waitForURL(calendar.url);
    }
}