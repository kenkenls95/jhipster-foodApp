import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BillComponentsPage, BillDeleteDialog, BillUpdatePage } from './bill.page-object';

const expect = chai.expect;

describe('Bill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let billComponentsPage: BillComponentsPage;
  let billUpdatePage: BillUpdatePage;
  let billDeleteDialog: BillDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bills', async () => {
    await navBarPage.goToEntity('bill');
    billComponentsPage = new BillComponentsPage();
    await browser.wait(ec.visibilityOf(billComponentsPage.title), 5000);
    expect(await billComponentsPage.getTitle()).to.eq('foodApp.bill.home.title');
    await browser.wait(ec.or(ec.visibilityOf(billComponentsPage.entities), ec.visibilityOf(billComponentsPage.noResult)), 1000);
  });

  it('should load create Bill page', async () => {
    await billComponentsPage.clickOnCreateButton();
    billUpdatePage = new BillUpdatePage();
    expect(await billUpdatePage.getPageTitle()).to.eq('foodApp.bill.home.createOrEditLabel');
    await billUpdatePage.cancel();
  });

  it('should create and save Bills', async () => {
    const nbButtonsBeforeCreate = await billComponentsPage.countDeleteButtons();

    await billComponentsPage.clickOnCreateButton();

    await promise.all([
      billUpdatePage.setBillidInput('5'),
      billUpdatePage.setDateInput('2000-12-31'),
      billUpdatePage.setTotalpriceInput('5'),
      billUpdatePage.setCouponidInput('5'),
    ]);

    expect(await billUpdatePage.getBillidInput()).to.eq('5', 'Expected billid value to be equals to 5');
    expect(await billUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    expect(await billUpdatePage.getTotalpriceInput()).to.eq('5', 'Expected totalprice value to be equals to 5');
    expect(await billUpdatePage.getCouponidInput()).to.eq('5', 'Expected couponid value to be equals to 5');
    const selectedShipping = billUpdatePage.getShippingInput();
    if (await selectedShipping.isSelected()) {
      await billUpdatePage.getShippingInput().click();
      expect(await billUpdatePage.getShippingInput().isSelected(), 'Expected shipping not to be selected').to.be.false;
    } else {
      await billUpdatePage.getShippingInput().click();
      expect(await billUpdatePage.getShippingInput().isSelected(), 'Expected shipping to be selected').to.be.true;
    }

    await billUpdatePage.save();
    expect(await billUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bill', async () => {
    const nbButtonsBeforeDelete = await billComponentsPage.countDeleteButtons();
    await billComponentsPage.clickOnLastDeleteButton();

    billDeleteDialog = new BillDeleteDialog();
    expect(await billDeleteDialog.getDialogTitle()).to.eq('foodApp.bill.delete.question');
    await billDeleteDialog.clickOnConfirmButton();

    expect(await billComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
