# KESME SACCO – Django Backend

REST API backend for the KESME SACCO website.
Built with **Django 4.2** + **Django REST Framework** + **JWT authentication**.

---

## Quick Start

### 1. Prerequisites
- Python 3.10 or higher
- pip

### 2. Create & activate a virtual environment
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
pip install python-dateutil   # needed for loan amortisation
```

### 4. Configure environment
```bash
cp .env.example .env
# Edit .env and set your SECRET_KEY
```

### 5. Run migrations & create admin user
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 6. (Optional) Load sample data
```bash
python manage.py loaddata fixtures/sample_data.json
```

### 7. Start the development server
```bash
python manage.py runserver
```

The API is now available at **http://127.0.0.1:8000/**

Django Admin: **http://127.0.0.1:8000/admin/**

---

## API Endpoints

### Authentication
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login/` | Login — returns access + refresh JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| POST | `/api/auth/logout/` | Blacklist refresh token (logout) |

### Members `/api/members/`
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/members/` | Register a new member (public) |
| GET | `/api/members/` | List all members (staff only) |
| GET | `/api/members/{id}/` | Get member detail |
| GET/PUT | `/api/members/me/` | My profile |
| POST | `/api/members/me/change-password/` | Change password |
| PATCH | `/api/members/{id}/activate/` | Activate member (staff) |
| PATCH | `/api/members/{id}/suspend/` | Suspend member (staff) |
| GET | `/api/members/dashboard/` | Member portal dashboard |

### Savings `/api/savings/`
| Method | URL | Description |
|--------|-----|-------------|
| GET/POST | `/api/savings/accounts/` | List / create savings accounts |
| GET | `/api/savings/accounts/{id}/` | Account detail |
| POST | `/api/savings/accounts/{id}/deposit/` | Deposit funds |
| POST | `/api/savings/accounts/{id}/withdraw/` | Withdraw funds |
| GET | `/api/savings/accounts/{id}/statement/` | Last 50 transactions |
| GET | `/api/savings/transactions/` | All transactions |
| GET/POST | `/api/savings/fixed/` | Fixed deposits |

### Loans `/api/loans/`
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/loans/products/` | List loan products (public) |
| GET/POST | `/api/loans/applications/` | Submit / list applications |
| POST | `/api/loans/applications/{id}/approve/` | Approve (staff) |
| POST | `/api/loans/applications/{id}/reject/` | Reject (staff) |
| GET | `/api/loans/active/` | List active loans |
| GET | `/api/loans/active/{id}/schedule/` | Amortisation schedule |
| POST | `/api/loans/active/{id}/repay/` | Record repayment |
| POST | `/api/loans/calculate/` | EMI calculator (public) |

### News `/api/news/`
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/news/articles/` | Published articles (public) |
| GET | `/api/news/articles/{id or slug}/` | Article detail (public) |
| POST | `/api/news/articles/` | Create article (staff) |
| GET | `/api/news/categories/` | List categories (public) |

### Contact `/api/contact/`
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/contact/inquiries/` | Submit inquiry (public) |
| GET | `/api/contact/inquiries/` | List inquiries (staff) |
| PATCH | `/api/contact/inquiries/{id}/resolve/` | Resolve inquiry (staff) |
| PATCH | `/api/contact/inquiries/{id}/in-progress/` | Mark in progress (staff) |

### Agribusiness `/api/agribusiness/`
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/agribusiness/value-chains/` | List value chains (public) |
| GET/POST | `/api/agribusiness/applications/` | Agri financing applications |
| PATCH | `/api/agribusiness/applications/{id}/approve/` | Approve (staff) |
| PATCH | `/api/agribusiness/applications/{id}/reject/` | Reject (staff) |
| GET | `/api/agribusiness/trainings/` | Training sessions |
| POST | `/api/agribusiness/trainings/{id}/register/` | Self-register for training |

---

## Project Structure
```
backend/
├── manage.py
├── requirements.txt
├── .env.example
├── kesme_sacco/        # Project settings & root URLs
│   ├── settings.py
│   └── urls.py
├── accounts/           # Member management & JWT auth
├── savings/            # Savings accounts & transactions
├── loans/              # Loan products, applications, repayments
├── news/               # News articles & categories
├── contact/            # Contact form inquiries
└── agribusiness/       # Value chains, agri financing, trainings
```

## Key Design Decisions
- **AUTH_USER_MODEL = accounts.Member** — the Member model IS the Django user, enabling direct portal login
- **JWT tokens** — stateless auth, 8-hour access / 7-day refresh with rotation & blacklisting
- **Role-based access** — staff (`is_staff=True`) see everything; members see only their own data
- **Auto-generated IDs** — member numbers (KSM-YYYY-NNNN), loan numbers (LN-YYYY-NNNNN), account numbers, etc.
- **SQLite** for development; swap `DATABASES` in `settings.py` for PostgreSQL in production
