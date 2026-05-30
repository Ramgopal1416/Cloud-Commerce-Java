---
name: Payment method pg enum constraint
description: ordersTable.paymentMethod is a pg enum — only STRIPE/RAZORPAY/COD are valid values
---

The rule: `paymentMethod` on `ordersTable` is a Postgres enum type with exactly three valid values: `STRIPE`, `RAZORPAY`, `COD`. Inserting any other string causes a DB error.

**Why:** The schema uses `pgEnum("payment_method", ["STRIPE", "RAZORPAY", "COD"])`. Drizzle passes the value directly to Postgres which enforces the enum constraint.

**How to apply:** In the order creation route, always validate/map the incoming `paymentMethod` to one of the valid enum values before inserting. Any unrecognized string (e.g. "Credit Card", "PayPal") should fall back to `"COD"`.
