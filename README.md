# Automation Testing Assignment

Name: Shihab Hossain
Course: SQA (Ostad)

In this assignment I did:
- UI automation on https://www.saucedemo.com using **Playwright (JavaScript)**
- API automation on https://reqres.in/api using **Postman** and ran it with **Newman**

## Folder structure

```
tests/
  q1.spec.js      -> Q1 locked_out_user
  q2.spec.js      -> Q2 standard_user buy 3 items
  q3.spec.js      -> Q3 performance_glitch_user filter Z to A
postman/
  reqres-collection.json   -> Postman collection
  reqres-environment.json  -> Postman environment
playwright.config.js
package.json
```

## Requirements

- Node.js (version 20 or higher)
- Java (only for Allure report)

## How to install

```
npm install
npx playwright install chromium
```

## How to run UI tests

Run one by one:
```
npm run test:q1
npm run test:q2
npm run test:q3
```

Run all together (one after another):
```
npm test
```

See browser while running:
```
npm run test:headed
```

## Reports

Playwright HTML report:
```
npm run report
```

Allure report:
```
npm run allure
```

## How to run API tests

```
npm run api
```

The HTML report is saved in the `newman` folder (`newman/api-report.html`).

I also imported the collection and environment in the Postman app and ran it with **Run collection**.

Note: reqres needs `x-api-key` header. The key is in the environment file (`apiKey`). If you get 401, get a free key from https://app.reqres.in and change it.

## API tests

| Request | What I checked |
|---|---|
| Register | status 200, saved userId |
| Q3 Login | status 200, saved token |
| Q4 Get User | status 200, name and email are correct |
| Q5 PUT | status 200, name and job updated, updatedAt is present |
| Q6 PATCH | status 200, only job changed |
| Q8 Bad requests | 400 / 404 errors using saved email and userId |
