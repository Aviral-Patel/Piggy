# 🐷 Piggy — SMS‑Powered Personal Finance Tracker

> Turn noisy bank SMS alerts into clean, structured transactions and beautiful spending insights.

Piggy is a **personal finance application** that parses **bank SMS alerts** using **bank‑specific regex patterns** and converts them into **structured transactions**. Users can paste or bulk‑upload SMS messages and instantly see categorized spending (Food, Shopping, Transport, etc.) on an intuitive dashboard.

---

## ✨ Key Highlights

* 📩 Parse real bank SMS into structured data
* 🧩 Regex‑driven, bank‑specific parsing engine
* 🔐 Secure JWT‑based authentication
* 🧠 Maker–Checker workflow for safe regex approvals
* 📊 Clean dashboard with categorized spending
* 🛠️ Admin panel for role management

---

## 🧱 Tech Stack

| Layer        | Stack                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| **Backend**  | Spring Boot 4, Java 21, Spring Security (JWT), Spring Data JPA, H2 (dev)     |
| **Frontend** | React 19 (Vite), React Router, Axios, Tailwind CSS, React Toastify, Recharts |
| **Auth**     | JWT (stateless) + separate Admin JWT (`adminToken`)                          |

---

## 👥 Roles & Permissions

| Role        | Description      | Access                                                        |
| ----------- | ---------------- | ------------------------------------------------------------- |
| **USER**    | End user         | Dashboard only. Paste / bulk‑parse SMS and view transactions. |
| **MAKER**   | Pattern author   | USER access + create/test regex patterns, view unparsed SMS.  |
| **CHECKER** | Pattern approver | MAKER access + approve or reject regex patterns.              |
| **ADMIN**   | Super admin      | Separate `/admin` login. Manage users and roles only.         |

### 🔀 Application Routes

* `/` — Home
* `/login`, `/signup` — Authentication
* `/dashboard` — Main application
* `/sms-parser` — MAKER & CHECKER
* `/template-approval` — CHECKER only
* `/admin`, `/admin/dashboard` — Admin panel

### 🔒 Security Enforcement

* Frontend enforces role‑based routing via `ProtectedRoute`
* Backend validates JWTs and restricts sensitive APIs by role

---

## 🧩 SMS Regex Parsing Engine

Parsing is handled by **`SmsRegexParser`** (backend `util` package).

### 🔍 How Parsing Works

1. **Input**
   Raw SMS text + **bank address** (e.g. `VM-HDFCBK`, `BZ-SBIINB`).

2. **Pattern Selection**
   Only `APPROVED` patterns matching the `bankAddress` are loaded.

3. **Matching**
   Patterns are evaluated sequentially (case‑insensitive). The **first successful match wins**.

4. **Transaction Construction**
   Regex **named capture groups** are mapped to a `Transaction` entity.

   * From Pattern metadata: `bankName`, `bankAddress`, `category`
   * From regex groups: `accountNumber`, `type`, `amount`, `date`, `merchant`, `balance`, `refNumber`

5. **Validation Rules**

   * `amount` is mandatory for **CREDITED / DEBITED**
   * `amount` is optional for **ALERT / REMINDER**

6. **Type Resolution**

   * Use regex `type` group if present
   * Otherwise infer from SMS keywords

### 🧷 Supported Regex Groups

`accountNumber`, `type`, `amount`, `date`, `merchant`, `balance`, `refNumber`

**Supported date formats:** `dd-MMM-yy`, `dd/MM/yy`, `yyyy-MM-dd`

### ❌ No‑Match Handling

If no pattern matches:

* SMS is stored as an **UnparsedMessage**
* API returns an error to the user
* MAKERs can review and fix patterns using failed messages

---

## 🏗️ Architecture Overview

```
React (Vite)  ──▶  Spring Boot REST API  ──▶  MySQL / DB
        ▲                    │
        └──── JWT Auth ◀──────┘
```

* Stateless JWT authentication
* REST API base: `http://localhost:8080`

---

## 🔄 SMS Parsing Flow (Single Message)

1. User selects bank and pastes SMS on Dashboard
2. Frontend → `POST /api/transactions/parse`

   ```json
   { "sms": "...", "bankAddress": "VM-HDFCBK" }
   ```
3. Backend attempts regex match
4. ✅ Match → Transaction saved and returned
5. ❌ No match → SMS stored as unparsed
6. Dashboard refreshes via `GET /api/transactions`

### 📦 Bulk Parsing

* Same API used per SMS
* Progress and results shown live on UI

---

## 🔁 Maker–Checker Workflow

### MAKER Flow

1. Open **SMS Parser**
2. Create regex pattern + sample message
3. Test using `/api/patterns/test-match`
4. Save pattern → status `PENDING`

### CHECKER Flow

1. Open **Template Approval**
2. Review pending patterns
3. Approve or reject via `/api/patterns/{id}/status`

> ⚠️ Only **APPROVED** patterns are used for parsing

---

## 🧠 Backend Modules

| Module            | Responsibility             |
| ----------------- | -------------------------- |
| Auth              | JWT auth, login, roles     |
| Transactions      | SMS → Transaction parsing  |
| Patterns          | Regex lifecycle management |
| SMS Parser        | Regex execution & mapping  |
| Unparsed Messages | Failed SMS tracking        |
| Admin             | User & role management     |

---

## 🎨 Frontend Modules

| Module            | Responsibility               |
| ----------------- | ---------------------------- |
| Dashboard         | SMS input & transaction view |
| SMS Parser        | Regex creation & testing     |
| Template Approval | Pattern review               |
| Admin Panel       | User role management         |
| Routing           | Role‑based access control    |

---

## 🗄️ Database Model

* **users** — credentials & roles
* **transactions** — parsed financial data
* **patterns** — bank‑specific regex rules
* **unparsed_messages** — failed SMS inputs

---

## 🤖 AI-Usage Log

**Purpose:** AI is used only during **development** of this project—not in the runtime app. Parsing is regex-based (`SmsRegexParser`); no LLM/AI runs in production.

**How we use AI:**

1. **Regex Pattern Development**
   - Creating complex named capture groups for parsing bank SMS
   - Example: Structuring patterns to extract `accountNumber`, `type`, `amount`, `date`, 
   - (Ex. '.*?A/?c\s+(?<accountNumber>\w+)\s+(?:is\s+)?(?<type>debited|withdrawn|spent)\s+(?:for|by)\s+(?:INR|Rs\.?)\s+(?<amount>[\d,]+\.\d{2})\s+on\s+(?<date>\d{1,2}-?\w{3}-?\d{2})(?:\s+via\s+UPI)?\s+(?:to|at)\s+(?<merchant>(?:UPI-|BBPS-)?(?:ZOMATO|SWIGGY|DOMINOS|PIZZA HUT|DUNZO|BLINKIT|ZEPTO|INSTAMART|BIGBASKET|MCDONALD|KFC|BURGER KING|SUBWAY))(?:\.\s+|\s+)(?:Avl Bal|Available Bal):\s+(?:INR|Rs\.?)\s+(?<balance>[\d,]+\.\d{2})(?:\.\s+|\s+)Ref(?:\s+No)?:\s+(?<refNumber>\d+)')

2. **Understanding Banking SMS Variations**
   - Analyzing SMS formats from different banks (HDFC, SBI, ICICI, etc.)
   - Identifying common patterns and edge cases across bank-specific message structures

3. **Security Configuration Guidance**
   - Understanding Spring Security setup with JWT authentication
   - Implementing role-based access control (USER, MAKER, CHECKER, ADMIN)

4. **Error Handling Architecture**
   - Designing the unparsed message system for SMS that don't match patterns
   - Structuring exception handling and user feedback flow

5. **Code Documentation**
   - Drafting JavaDoc and JSDoc comments for complex utility methods
   - Documenting API endpoints and their expected behavior

6. **JPA Repository Query Methods**
   - Writing efficient Spring Data JPA queries with proper naming conventions
   - Understanding method naming like findByUserAndBankAddressOrderByDateDesc
   - Example: "Query to get transactions for a user filtered by category and date range"

7. **H2 Database Schema & Data Initialization**
   - Writing data.sql seed scripts for testing patterns
   - Understanding entity relationships and foreign key constraints
   - Example: "Create sample patterns for HDFC, SBI, and ICICI with different categories"

8. **Category Inference Logic**
   - Mapping merchant names to categories (FOOD, SHOPPING, TRANSPORT, etc.)
   - Creating fallback logic when merchant is unknown
   - Example: "Should 'AMAZON' be SHOPPING or create separate OTHER category?"

9. **Debugging Common Development Issues**
   - Troubleshooting API connection failures, 404/500 errors, and request-response mismatches
   - Identifying root causes when frontend-backend integration breaks (CORS, authentication, malformed requests)
   - Example: "Why is /api/transactions/parse returning 403 Forbidden even though user is logged in?"

---

## 🚀 Local Development Setup (macOS)

Follow this guide to clone and run Piggy on your Mac.

---

### 📋 Prerequisites

Ensure you have the following installed:

| Tool | Version | Check Command |
|------|---------|---------------|
| **Java** | 21+ | `java -version` |
| **Node.js** | 18+ | `node -v` |
| **npm** | 9+ | `npm -v` |
| **MySQL** | 8.0+ | `mysql --version` |
| **Git** | Any recent version | `git --version` |

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Piggy.git
cd Piggy
```

---

### Step 2: Set Up MySQL Database

1. **Start MySQL service** (if not running):

   ```bash
   brew services start mysql
   ```

2. **Create the database**:

   ```bash
   mysql -u root -p
   ```

   Then run:

   ```sql
   CREATE DATABASE piggy_db;
   CREATE USER 'piggy_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON piggy_db.* TO 'piggy_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

---

### Step 3: Configure Backend

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Create application.properties**:

   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```

3. **Edit the configuration file** (`src/main/resources/application.properties`):

   ```properties
   spring.application.name=backend

   # MySQL Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/piggy_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.datasource.username=piggy_user
   spring.datasource.password=your_secure_password

   # JPA/Hibernate
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   spring.jpa.defer-datasource-initialization=true
   spring.sql.init.mode=always

   logging.level.org.springframework.jdbc.datasource.init=DEBUG

   # JWT Configuration
   jwt.secret=YOUR_BASE64_ENCODED_SECRET_KEY
   jwt.expiration-ms=86400000
   ```

4. **Generate a JWT secret key**:

   ```bash
   openssl rand -base64 32
   ```

   Copy the output and replace `YOUR_BASE64_ENCODED_SECRET_KEY` in the properties file.

---

### Step 4: Run the Backend

From the `backend` directory:

```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or if Maven is installed globally
mvn spring-boot:run
```

**Expected output**:
```
Started BackendApplication in X.XXX seconds
```

The backend API will be available at: `http://localhost:8080`

---

### Step 5: Set Up and Run the Frontend

1. **Open a new terminal** and navigate to the client directory:

   ```bash
   cd Piggy/client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

**Expected output**:
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Step 6: Access the Application

| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | Main Application (User Login) |
| `http://localhost:5173/admin` | Admin Panel |
| `http://localhost:8080` | Backend API |

---

### 🧪 Testing the Setup

1. **Create a new user account**:
   - Go to `http://localhost:5173/signup`
   - Register with email and password

2. **Login and access dashboard**:
   - Go to `http://localhost:5173/login`
   - Login with your credentials
   - You should see the Dashboard

3. **Test SMS parsing**:
   - On the Dashboard, select a bank
   - Paste a sample bank SMS
   - Click parse to see the transaction

---

### 🔧 Running Tests

**Backend tests**:

```bash
cd backend
./mvnw test
```

**Frontend lint check**:

```bash
cd client
npm run lint
```

---

### 📁 Project Directory Structure

```
Piggy/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Java source code
│   │   │   └── resources/  # Configuration files
│   │   └── test/           # Test files
│   ├── pom.xml             # Maven dependencies
│   └── mvnw                # Maven wrapper
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React contexts
│   │   └── assets/         # Images and icons
│   ├── package.json        # npm dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

---

### ⚠️ Common Issues & Troubleshooting

| Issue | Solution |
|-------|----------|
| **MySQL connection refused** | Ensure MySQL service is running and credentials are correct |
| **Port 8080 already in use** | Kill the process using the port: `lsof -ti:8080 \| xargs kill -9` |
| **Port 5173 already in use** | Kill the process: `lsof -ti:5173 \| xargs kill -9` |
| **Maven wrapper permission denied** | Run: `chmod +x mvnw` |
| **npm install fails** | Delete `node_modules` and `package-lock.json`, then retry |
| **JWT authentication errors** | Ensure `jwt.secret` is properly configured and base64 encoded |
| **CORS errors** | Backend must be running on port 8080 for frontend to connect |

---

### 🔄 Development Workflow

1. **Start backend first** (Terminal 1):
   ```bash
   cd backend && ./mvnw spring-boot:run
   ```

2. **Start frontend** (Terminal 2):
   ```bash
   cd client && npm run dev
   ```

3. **Make changes**:
   - Backend changes require restart (or use Spring DevTools for hot reload)
   - Frontend changes hot-reload automatically via Vite

4. **Check logs**:
   - Backend logs appear in Terminal 1
   - Frontend errors appear in browser console

---

### 🛑 Stopping the Application

- **Backend**: Press `Ctrl + C` in the terminal running Spring Boot
- **Frontend**: Press `Ctrl + C` in the terminal running Vite
- **MySQL**: 
  ```bash
  brew services stop mysql
  ```
