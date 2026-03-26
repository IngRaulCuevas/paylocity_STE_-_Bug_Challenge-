import { test, expect } from '@playwright/test';
import { EmployeePage } from '../Pages/employeePage';

test('HPH001_Add_employee_zero_dependents', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const num = Date.now();
  await employeePage.addUserZeroDependents(num);
});

test('HPH002_Add_employee_with_one_dependents', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const num = Date.now();
  await employeePage.addUserOneDependents(num);
});

test('HPH003_Add_employee_with_múltiple_dependents', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const num = Date.now();
  await employeePage.addUserMultipleDependents(num);
 });

test('Validation_calculations_binnacle_Benefits_Pay', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const rowIndex = 1;
  await employeePage.verifyBenefitAndPayment();
});
test('HPH012_Validate_remove_employee', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const rowIndex = 1;
  await employeePage.deleteEmployee();
});
test('HPH007_Validate_data_editing_(First Name, Last Name, Dependents)', async ({ page }) => {
  const employeePage = new EmployeePage(page);
  await employeePage.goTo();
  await employeePage.logIn();
  await expect(page.locator("xpath=//a[text()='Paylocity Benefits Dashboard']")).toBeVisible();
  const rowIndex = 1;
  await employeePage.updateEmployee();
});