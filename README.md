# 🕸️ ScrapeBot - Web Scraper Workflow Builder

A **no-code**, AI-powered platform to build custom **web scraping workflows** using a drag-and-drop interface. Launch headless browsers, navigate pages, extract content with precision—or let **AI** extract the data for you.

Perfect for non-coders, data analysts, and anyone who needs structured data from the web, fast.

---

## 🚀 Features

* 🧩 **Visual Drag-and-Drop Workflow Editor** – Build scraping workflows using customizable action nodes.
* 🤖 **AI-Powered Extraction** – Extract structured data from any webpage using built-in AI tools.
* 🧠 **Smart Selectors** – Automatically detect and interact with DOM elements.
* 🌐 **Dynamic Navigation** – Browse to different URLs, scroll, fill forms, click buttons, and extract info.
* 📤 **Webhook Delivery** – Send results directly to a custom webhook endpoint.
* 🔁 **Flexible Logic** – Modify and enrich scraped data using JSON operations within the flow.

---

## 🧱 Available Nodes

| Node                        | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| `LAUNCH_BROWSER`            | Launches a browser instance.                                          |
| `NAVIGATE_URL`              | Navigates to a specific URL.                                          |
| `PAGE_TO_HTML`              | Captures the full HTML of the current page.                           |
| `EXTRACT_TEXT_FROM_ELEMENT` | Extracts text using a CSS selector.                                   |
| `FILL_INPUT`                | Fills input fields on the page.                                       |
| `CLICK_ELEMENT`             | Clicks a specified element.                                           |
| `WAIT_FOR_ELEMENT`          | Waits until a specific element appears in the DOM.                    |
| `SCROLL_TO_ELEMENT`         | Scrolls the page to bring an element into view.                       |
| `DELIVER_VIA_WEBHOOK`       | Sends final output JSON to a specified webhook.                       |
| `EXTRACT_DATA_WITH_AI`      | Uses AI to understand and extract structured data from complex pages. |
| `READ_PROPERTY_FROM_JSON`   | Reads a property from the JSON context created during the workflow.   |
| `ADD_PROPERTY_TO_JSON`      | Adds or modifies properties in the workflow’s internal JSON state.    |

---

## 🤖 AI Extraction

Our **AI-powered node** (`EXTRACT_DATA_WITH_AI`) can understand complex pages like product listings, reviews, articles, etc., and automatically return clean, structured data without requiring specific selectors.

Since this is a personal project, **you’ll need to add your own OpenAI API key in the credentials section** of the website. Your key is securely encrypted using robust **AES-256-CBC encryption**, following industry best practices. This ensures that your sensitive information remains safe and protected throughout its usage.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Agnish1611/ScrapeBot.git
cd ScrapeBot
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add the following (based on what you use):

```env
DATABASE_URL="postgresql://<username>:<password>@<host>/<database>?sslmode=require"

BETTER_AUTH_SECRET=********
BETTER_AUTH_URL=http://localhost:3000
EMAIL_VERIFICATION_CALLBACK_URL=http://localhost:3000/email-verified

SENDGRID_API_KEY=********
EMAIL_FROM=agnish.2023ug2048@iiitranchi.ac.in

GITHUB_CLIENT_ID=********
GITHUB_CLIENT_SECRET=********

NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_APP_URL=http://localhost:3000

API_SECRET=********

ENCRYPTION_KEY=********

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=********
STRIPE_SECRET_KEY=********

STRIPE_SMALL_PACK_PRICE_ID=********
STRIPE_MEDIUM_PACK_PRICE_ID=********
STRIPE_LARGE_PACK_PRICE_ID=********

STRIPE_WEBHOOK_SECRET=********
```

> 🔐 Ensure your `.env` file is listed in `.gitignore` to prevent leaking sensitive data.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to use the visual scraper builder.

---

Let me know if you'd like to auto-deploy this via Vercel or add CI/CD setup instructions!
