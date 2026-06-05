# 🧾 BillFlow - Invoice Management System

BillFlow is a full-stack Invoice Management System developed using Spring Boot, MySQL, HTML, CSS, and JavaScript.

The application allows users to create invoices, manage multiple products, automatically calculate GST, store invoices in a database, and view invoice history through a clean and responsive user interface.

---

## Features

✅ Create invoices with multiple products

✅ Automatic subtotal calculation

✅ Automatic GST (18%) calculation

✅ Automatic final amount calculation

✅ Store invoices in MySQL database

✅ Invoice history management

✅ View invoice details

✅ Delete invoices

✅ Responsive and user-friendly interface

✅ REST API integration using Spring Boot

---

## Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL

### Frontend
- HTML5
- CSS3
- JavaScript

### Tools
- Eclipse IDE
- Maven
- Git
- GitHub
- Postman

---

## Project Structure

```text
billflow
│
├── src/main/java
│   ├── controller
│   ├── entity
│   ├── repository
│   └── service
│
├── src/main/resources
│   ├── static
│   │   ├── index.html
│   │   ├── css
│   │   └── js
│   │
│   └── application.properties
│
└── pom.xml
```

---

## Database Schema

### Invoice Table

| Column | Type |
|----------|----------|
| id | BIGINT |
| customer_name | VARCHAR |
| date | DATE |
| total_amount | DOUBLE |
| tax | DOUBLE |
| final_amount | DOUBLE |

### Item Table

| Column | Type |
|----------|----------|
| id | BIGINT |
| product_name | VARCHAR |
| quantity | INT |
| unit_price | DOUBLE |
| total_price | DOUBLE |
| invoice_id | BIGINT |

Relationship:

```text
Invoice (1) ---------> (Many) Item
```

Implemented using:

```java
@OneToMany(cascade = CascadeType.ALL)
@JoinColumn(name = "invoice_id")
private List<Item> items;
```

---

## REST API Endpoints

### Create Invoice

```http
POST /api/invoices
```

### Get All Invoices

```http
GET /api/invoices
```

### Get Invoice By ID

```http
GET /api/invoices/{id}
```

### Update Invoice

```http
PUT /api/invoices/{id}
```

### Delete Invoice

```http
DELETE /api/invoices/{id}
```

---

## GST Calculation Logic

```java
subtotal = quantity × unitPrice

tax = subtotal × 0.18

finalAmount = subtotal + tax
```

---

## Sample Invoice

```text
Customer : Alex

Products

Book        Qty:1   Price:849
Pen         Qty:2   Price:100
Notebook    Qty:1   Price:599

Subtotal     : ₹1648
GST (18%)    : ₹296.64
Final Amount : ₹1944.64
```

---

## How to Run

### Clone Repository

```bash
git clone https://github.com/Shaik-24/Bill_Flow.git
```

### Navigate

```bash
cd Bill_Flow
```

### Configure Database

Create database:

```sql
CREATE DATABASE billflow;
```

Update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/billflow
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run Application

```bash
mvn spring-boot:run
```

Open:

```text
http://localhost:8080
```

---

## Future Enhancements

- PDF Invoice Generation
- Download Invoice Feature
- Search Invoice by Customer Name
- Dashboard Analytics
- Pagination
- User Authentication & Authorization
- Email Invoice to Customer
- Invoice Status Tracking

---

## Learning Outcomes

This project helped in understanding:

- Spring Boot Architecture
- REST APIs
- CRUD Operations
- JPA & Hibernate
- One-to-Many Relationships
- MySQL Integration
- Frontend and Backend Integration
- Git & GitHub Workflow

---

## Author

**Shaik Adil**

Java Developer | Spring Boot | REST APIs | MySQL | SQL

GitHub:
https://github.com/Shaik-24

---

## Project Status

✅ Completed

Version: 1.0
