# 🎭 Playwright Automation Framework (UI + API)

This project is an automation testing framework built with **Playwright + TypeScript**.  
It contains both **UI tests (E2E)** and **API tests**, following a clean Page Object Model structure.

The goal of this project is to demonstrate real-world automation skills used in QA work:
- UI automation (web)
- API automation
- test data handling
- CI pipeline with GitHub Actions
- clean and scalable structure (Page Objects)

---

## 🚀 Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **GitHub Actions CI**

---

## ✅ Features

### UI Tests (AutomationExercise)
- User registration flow
- Login flow
- Product search
- Add to cart
- Checkout flow (E2E)
- Handling consent popup + ads

### API Tests
- GET products list endpoint validation
- Status code validation
- JSON parsing and response assertions

  ## ⚙️Installation

  ### Clone repository
  git clone [<URL_REPOZYTORIUM>](https://github.com/Sundzaj/Portfolio-3.git)

### Install dependencies
npm install

### Install Playwright browsers
npx playwright install

## 🔐 Environment Variables

This project supports .env configuration. Create a local .env file in the root folder
cp .env.example .env

Example `.env`:

```env
BASE_URL=https://automationexercise.com
TEST_USER_NAME=Dawid Tester
TEST_USER_PASSWORD=Test1234!

TEST_USER_FIRST_NAME=Dawid
TEST_USER_LAST_NAME=Tester
TEST_USER_ADDRESS=Test Street 1
TEST_USER_STATE=State
TEST_USER_CITY=City
TEST_USER_ZIPCODE=00-001
TEST_USER_MOBILE=123456789
```

## ▶️Running tests

### Run all tests
npx playwright test

##🧪 Test Scenarios Included
### UI (E2E)

- Register new user
- Search product
- Add product to cart
- Checkout and place an order
- Validate success message: ORDER PLACED!

### API

- Validate products list endpoint
- Verify status code
- Verify JSON response contains expected product

## 📌 Notes

The tested website contains dynamic popups such as:

- consent dialogs
- ads in iframe

This framework includes methods to automatically handle them to keep tests stable.


