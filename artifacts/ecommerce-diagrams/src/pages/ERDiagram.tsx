import DiagramPage from "../components/DiagramPage";
import MermaidDiagram from "../components/MermaidDiagram";

const chart = `
erDiagram
  USERS {
    int user_id PK
    varchar username
    varchar email
    varchar password_hash
    enum role "CUSTOMER, ADMIN"
    varchar phone
    varchar address
    timestamp created_at
    boolean is_active
  }

  PRODUCTS {
    int product_id PK
    varchar name
    text description
    decimal price
    varchar category
    varchar brand
    varchar image_url
    int inventory_id FK
    boolean is_active
    timestamp created_at
  }

  CATEGORIES {
    int category_id PK
    varchar name
    varchar description
    int parent_category_id FK
  }

  INVENTORY {
    int inventory_id PK
    int product_id FK
    int quantity
    int low_stock_threshold
    timestamp last_updated
  }

  SHOPPING_CART {
    int cart_id PK
    int user_id FK
    timestamp created_at
    timestamp updated_at
  }

  CART_ITEMS {
    int cart_item_id PK
    int cart_id FK
    int product_id FK
    int quantity
    decimal unit_price
  }

  ORDERS {
    int order_id PK
    int user_id FK
    decimal total_amount
    enum status "PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED"
    varchar shipping_address
    timestamp order_date
    timestamp updated_at
  }

  ORDER_ITEMS {
    int order_item_id PK
    int order_id FK
    int product_id FK
    int quantity
    decimal unit_price
    decimal subtotal
  }

  PAYMENTS {
    int payment_id PK
    int order_id FK
    decimal amount
    enum method "CREDIT_CARD, DEBIT_CARD, UPI, WALLET"
    enum status "PENDING, COMPLETED, FAILED, REFUNDED"
    varchar transaction_id
    timestamp payment_date
  }

  NOTIFICATIONS {
    int notification_id PK
    int user_id FK
    int order_id FK
    varchar sns_message_id
    enum type "ORDER_CONFIRM, SHIPPED, DELIVERED, LOW_STOCK"
    text message
    boolean is_sent
    timestamp sent_at
  }

  CHATBOT_LOGS {
    int log_id PK
    int user_id FK
    text user_message
    text bot_response
    varchar session_id
    timestamp created_at
    varchar intent
  }

  PRODUCT_REVIEWS {
    int review_id PK
    int product_id FK
    int user_id FK
    int rating
    text comment
    timestamp created_at
  }

  USERS ||--o{ SHOPPING_CART : "has"
  SHOPPING_CART ||--o{ CART_ITEMS : "contains"
  CART_ITEMS }o--|| PRODUCTS : "references"
  USERS ||--o{ ORDERS : "places"
  ORDERS ||--o{ ORDER_ITEMS : "has"
  ORDER_ITEMS }o--|| PRODUCTS : "for"
  ORDERS ||--o| PAYMENTS : "paid via"
  PRODUCTS ||--|| INVENTORY : "tracked by"
  PRODUCTS }o--|| CATEGORIES : "belongs to"
  CATEGORIES ||--o{ CATEGORIES : "parent of"
  USERS ||--o{ NOTIFICATIONS : "receives"
  ORDERS ||--o{ NOTIFICATIONS : "triggers"
  USERS ||--o{ CHATBOT_LOGS : "generates"
  USERS ||--o{ PRODUCT_REVIEWS : "writes"
  PRODUCTS ||--o{ PRODUCT_REVIEWS : "receives"
`;

export default function ERDiagram() {
  return (
    <DiagramPage
      title="Entity-Relationship (ER) Diagram"
      description="Defines the complete database schema for AWS RDS (MySQL), including all entities, attributes, primary/foreign keys, and relationships across Users, Products, Orders, Payments, Inventory, Chatbot Logs, and Notifications."
    >
      <MermaidDiagram chart={chart} />
    </DiagramPage>
  );
}
