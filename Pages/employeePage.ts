import { Page, expect } from '@playwright/test';

export class EmployeePage {
  readonly page: Page;
  readonly userNameInput;
  readonly passwordInput;
  readonly logInButton;
  readonly addEmployeeButton;
  readonly updateButton;
  readonly update1Button;
  readonly deleteButton;
  readonly bitacoraTabla;
  //window Add employee
  readonly firstNameInput;
  readonly lastNameInput;
  readonly dependentsInput;
  readonly addButton;
  readonly cancelButton;
  //window delete employee
  readonly delete1Button;
  readonly cancel1Button;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("xpath=//input[@name='Username']"); // ejemplo de selector
    this.passwordInput = page.locator("xpath=//input[@name='Password']");
    this.logInButton = page.locator("xpath=//button[text()='Log In']");
    this.addEmployeeButton = page.locator("xpath=//button[@type='button' and @id='add' and @class='btn btn-primary' and text()='Add Employee']");
    this.updateButton = page.locator("xpath=(//i[contains(@class,'fas') and contains(@class,'fa-edit')])[1]");
    this.deleteButton = page.locator("xpath=(//i[contains(@class,'fas') and contains(@class,'fa-times')])[1]");
    this.bitacoraTabla = page.locator("xpath=//table[@id='employeesTable']");

    //window Add employee / modify employee
    this.firstNameInput = page.locator("xpath=//input[@id='firstName']");
    this.lastNameInput = page.locator("xpath=//input[@id='lastName']");
    this.dependentsInput = page.locator("xpath=//input[@id='dependants']");
    this.addButton = page.locator("xpath=//button[@id='addEmployee']");
    this.update1Button = page.locator("xpath=//button[@id='updateEmployee']");
    this.cancelButton = page.locator("xpath=(//button[@data-dismiss='modal' and text()='Cancel'])[1]");
    //window delete employee
    this.delete1Button = page.locator("xpath=//button[@id='deleteEmployee']");
    this.cancel1Button = page.locator("xpath=(//button[@data-dismiss='modal' and text()='Cancel'])[2]");

  }

  async goTo() {
    await this.page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  }

  async logIn() {
    await this.userNameInput.fill("TestUser935");
    await this.passwordInput.fill("x7M2&e[j]CDc");
    await this.logInButton.click();
  }
async addUserZeroDependents(num: number) {
    await this.addEmployeeButton.waitFor({ state: 'visible' });
    await expect(this.addEmployeeButton).toBeEnabled();
    await this.page.waitForTimeout(3000);
    await this.addEmployeeButton.click();
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(`TestUser${num}`);
    await this.lastNameInput.fill("TestUser35");
    await this.dependentsInput.fill("0");
    await this.addButton.click();
    await expect(this.page.locator(`xpath=//tbody/tr/td[text()='TestUser${num}']`)).toBeVisible();
    await this.page.waitForTimeout(5000);
  }
async addUserOneDependents(num: number) {
    await this.addEmployeeButton.waitFor({ state: 'visible' });
    await expect(this.addEmployeeButton).toBeEnabled();
    await this.page.waitForTimeout(3000);
    await this.addEmployeeButton.click();
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(`TestUser${num}`);
    await this.lastNameInput.fill("TestUser35");
    await this.dependentsInput.fill("1");
    await this.addButton.click();
    await expect(this.page.locator(`xpath=//tbody/tr/td[text()='TestUser${num}']`)).toBeVisible();
  }
  async addUserMultipleDependents(num: number) {
    await this.addEmployeeButton.waitFor({ state: 'visible' });
    await expect(this.addEmployeeButton).toBeEnabled();
    await this.page.waitForTimeout(3000);
    await this.addEmployeeButton.click();
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(`TestUser${num}`);
    await this.lastNameInput.fill("TestUser35");

    const randomDependents = Math.floor(Math.random() * 6);
    await this.dependentsInput.fill(randomDependents.toString());
    await this.addButton.click();
    await expect(this.page.locator(`xpath=//tbody/tr/td[text()='TestUser${num}']`)).toBeVisible();
    
  }
  async verifyBenefitAndPayment() {

  await this.page.waitForTimeout(5000);
    
  const rows = this.page.locator("//tbody/tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

  const depenText = await row.locator("xpath=/td[4]").innerText();
  const depenValue = parseInt(depenText, 10);

  const benefitText = await row.locator("xpath=/td[7]").innerText();
  const benefitValue = parseFloat(benefitText);

  const paymentText = await row.locator("xpath=/td[8]").innerText();
  const paymentValue = parseFloat(paymentText);
  
  const expectedBenefit = ((depenValue * 500) + 1000) / 26;
    const expectedPayment = 2000 - expectedBenefit;

  
    console.log(`Fila ${i + 1}`);
    console.log(`Dependientes: ${depenValue}`);
    console.log(`Beneficio esperado: ${expectedBenefit.toFixed(2)} | Beneficio real: ${benefitValue}`);
    console.log(`Pago esperado: ${expectedPayment.toFixed(2)} | Pago real: ${paymentValue}`);

  
    expect(benefitValue).toBeCloseTo(expectedBenefit);
    expect(paymentValue).toBeCloseTo(expectedPayment);
   }
  }
async deleteEmployee() {

  await this.deleteButton.click();
  
  const firstNameSpan = this.page.locator("//span[@id='deleteFirstName']");
  const firstNameText = await firstNameSpan.innerText();

  const firstLastSpan = this.page.locator("//span[@id='deleteLastName']");
  const firstLastText = await firstLastSpan.innerText();

  console.log(`Nombre a borrar: ${firstNameText} ${firstLastText}`);
  
  await this.delete1Button.click();
  
 const rows = this.page.locator("//tbody/tr");
  const rowCount = await rows.count();

let found = false;

  
  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const lastNameText = await row.locator("xpath=/td[2]").innerText();
    
    const firstNameText = await row.locator("xpath=/td[3]").innerText();
    
    console.log(`Fila ${i + 1}: First Name=${firstNameText}, Last Name=${firstNameText}`);

    // Validar si el nombre coincide con el que se quiere borrar
    if (lastNameText.includes(firstNameText) && firstNameText.includes(firstLastText)) {
      found = true;
      break;
    }
  }

  expect(found).toBeFalsy();
}
async updateEmployee() {

await this.updateButton.click();
await this.firstNameInput.fill("tes");
await this.lastNameInput.fill("tes98");
await this.dependentsInput.fill("5");
await this.update1Button.click();

const rows = this.page.locator("//tbody/tr");
  const rowCount = await rows.count();

  

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    // Columna 1 → Nombre
    const lastNameText = await row.locator("xpath=/td[2]").innerText();
    const firstNameText = await row.locator("xpath=/td[3]").innerText();
    const depNameText = await row.locator("xpath=/td[4]").innerText();
    
    
    if (firstNameText=="tes98" && lastNameText=="tes" && depNameText=="5") {
      console.log(`Update successfully Last Name=${lastNameText}, First Name=${firstNameText}, Dependents=${depNameText}`);
      break; // detener el bucle en cuanto se encuentre
    }else{
      console.log("The record was not updated correctly");

    }


  }

 



}



}




