# MoneyHive

## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

MoneyHive is a financial SaaS platform built with Next.js and TypeScript. It allows users to manage their finances by securely connecting to multiple bank accounts, viewing real-time transactions, and transferring funds to other platform users.

## <a name="tech-stack">Tech Stack</a>

- Next.js – React framework for server-side rendering
- TypeScript – A statically typed superset of JavaScript
- Appwrite – Backend-as-a-service for handling user authentication and data storage
- Plaid – A powerful API for connecting bank accounts and retrieving transaction data
- Dwolla – Secure money transfer API for facilitating user-to-user fund transfers
- React Hook Form – Library for handling form validation and submission
- Zod – Type-safe schema validation for input validation
- TailwindCSS – Utility-first CSS framework for fast UI development
- Chart.js – JavaScript library for visualizing data (used for financial graphs and insights)
- ShadCN – Component library for building fast and responsive UI components

## <a name="features">Features</a>

**Authentication**: An ultra-secure SSR authentication with proper validations and authorization

**Connect Banks**: Integrates with Plaid for multiple bank account linking

**Home Page**: Shows general overview of user account with total balance from all connected banks, recent transactions, money spent on different categories, etc

**My Banks**: Check the complete list of all connected banks with respective balances, account details

**Transaction History**: Includes pagination and filtering options for viewing transaction history of different banks

**Real-time Updates**: Reflects changes across all relevant pages upon connecting new bank accounts.

**Funds Transfer**: Allows users to transfer funds using Dwolla to other accounts with required fields and recipient bank ID.

**Responsiveness**: Ensures the application adapts seamlessly to various screen sizes and devices, providing a consistent user experience across desktop, tablet, and mobile platforms.

and many more, including code architecture and reusability. 

## <a name="quick-start">Quick Start</a>

To get the project up and running locally on your machine, follow the steps below:

**Prerequisites**

Make sure the following dependencies are installed on your system:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/rosie-roses/money-hive-app.git
cd money-hive-app
```

**Installation**

Install the required project dependencies:

```bash
npm install
```

**Set Up Environment Variables**

Create a .env or .env.local file in the root directory using the .env.example file as a template.

Populate the file with your respective account credentials. These credentials can be obtained by signing up for the following services:
- [Appwrite](https://appwrite.io/)
- [Plaid](https://plaid.com/)
- [Dwolla](https://www.dwolla.com/)

**Running the Project**

Start the development server:

```bash
npm run dev
```

Once the server is up and running, open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application in action.