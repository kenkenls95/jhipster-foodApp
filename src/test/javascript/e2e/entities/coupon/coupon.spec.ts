import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CouponComponentsPage, CouponDeleteDialog, CouponUpdatePage } from './coupon.page-object';

const expect = chai.expect;

describe('Coupon e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let couponComponentsPage: CouponComponentsPage;
  let couponUpdatePage: CouponUpdatePage;
  let couponDeleteDialog: CouponDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Coupons', async () => {
    await navBarPage.goToEntity('coupon');
    couponComponentsPage = new CouponComponentsPage();
    await browser.wait(ec.visibilityOf(couponComponentsPage.title), 5000);
    expect(await couponComponentsPage.getTitle()).to.eq('foodApp.coupon.home.title');
    await browser.wait(ec.or(ec.visibilityOf(couponComponentsPage.entities), ec.visibilityOf(couponComponentsPage.noResult)), 1000);
  });

  it('should load create Coupon page', async () => {
    await couponComponentsPage.clickOnCreateButton();
    couponUpdatePage = new CouponUpdatePage();
    expect(await couponUpdatePage.getPageTitle()).to.eq('foodApp.coupon.home.createOrEditLabel');
    await couponUpdatePage.cancel();
  });

  it('should create and save Coupons', async () => {
    const nbButtonsBeforeCreate = await couponComponentsPage.countDeleteButtons();

    await couponComponentsPage.clickOnCreateButton();

    await promise.all([
      couponUpdatePage.setCouponidInput('5'),
      couponUpdatePage.setCouponnameInput('couponname'),
      couponUpdatePage.setCouponInput('5'),
      couponUpdatePage.setTypeInput('type'),
      couponUpdatePage.billSelectLastOption(),
    ]);

    expect(await couponUpdatePage.getCouponidInput()).to.eq('5', 'Expected couponid value to be equals to 5');
    expect(await couponUpdatePage.getCouponnameInput()).to.eq('couponname', 'Expected Couponname value to be equals to couponname');
    expect(await couponUpdatePage.getCouponInput()).to.eq('5', 'Expected coupon value to be equals to 5');
    expect(await couponUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');

    await couponUpdatePage.save();
    expect(await couponUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await couponComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Coupon', async () => {
    const nbButtonsBeforeDelete = await couponComponentsPage.countDeleteButtons();
    await couponComponentsPage.clickOnLastDeleteButton();

    couponDeleteDialog = new CouponDeleteDialog();
    expect(await couponDeleteDialog.getDialogTitle()).to.eq('foodApp.coupon.delete.question');
    await couponDeleteDialog.clickOnConfirmButton();

    expect(await couponComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
