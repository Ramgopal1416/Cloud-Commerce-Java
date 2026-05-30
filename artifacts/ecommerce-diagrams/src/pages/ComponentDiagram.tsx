import DiagramPage from "../components/DiagramPage";
import MermaidDiagram from "../components/MermaidDiagram";

const chart = `
graph LR
  subgraph Presentation["«layer» Presentation Layer"]
    UI_Customer["«component»\nCustomer Web UI\n(React / HTML/CSS)"]
    UI_Admin["«component»\nAdmin Dashboard UI\n(React / HTML/CSS)"]
    Chatbot_Widget["«component»\nAI Chatbot Widget\n(Floating UI)"]
  end

  subgraph API_Gateway["«layer» API Gateway / Security"]
    JWT["«component»\nJWT Auth Filter\n(Spring Security)"]
    CORS["«component»\nCORS Filter"]
    RateLimit["«component»\nRate Limiter"]
  end

  subgraph Business["«layer» Business Logic (Spring Boot)"]
    UserSvc["«component»\nUser Service\n(Registration, Login)"]
    ProductSvc["«component»\nProduct Service\n(CRUD, Search, Filter)"]
    CartSvc["«component»\nCart Service\n(Add, Remove, Update)"]
    OrderSvc["«component»\nOrder Service\n(Place, Track, Cancel)"]
    PaymentSvc["«component»\nPayment Service\n(Gateway, Verify)"]
    InventorySvc["«component»\nInventory Service\n(Stock, Alerts)"]
    NotificationSvc["«component»\nNotification Service\n(SNS Publisher)"]
    ChatbotSvc["«component»\nAI Chatbot Service\n(OpenAI / Bedrock)"]
    AdminSvc["«component»\nAdmin Service\n(Reports, Analytics)"]
    SearchSvc["«component»\nSearch Engine\n(Product Filtering)"]
  end

  subgraph DataAccess["«layer» Data Access Layer"]
    UserRepo["«repository»\nUser Repository\n(JPA / Hibernate)"]
    ProductRepo["«repository»\nProduct Repository"]
    OrderRepo["«repository»\nOrder Repository"]
    PaymentRepo["«repository»\nPayment Repository"]
    ChatRepo["«repository»\nChat Log Repository"]
    InventoryRepo["«repository»\nInventory Repository"]
  end

  subgraph Infrastructure["«layer» Infrastructure / Cloud"]
    MySQL[("«database»\nAWS RDS\nMySQL 8.0")]
    S3["«storage»\nAWS S3\n(Images, Docs)"]
    SNS["«messaging»\nAWS SNS\n(Notifications)"]
    AI["«external»\nOpenAI / Bedrock\n(LLM API)"]
  end

  UI_Customer --> JWT
  UI_Admin --> JWT
  Chatbot_Widget --> JWT
  JWT --> UserSvc
  JWT --> ProductSvc
  JWT --> CartSvc
  JWT --> OrderSvc
  JWT --> PaymentSvc
  JWT --> InventorySvc
  JWT --> ChatbotSvc
  JWT --> AdminSvc
  JWT --> SearchSvc
  OrderSvc --> NotificationSvc
  InventorySvc --> NotificationSvc
  UserSvc --> UserRepo
  ProductSvc --> ProductRepo
  OrderSvc --> OrderRepo
  PaymentSvc --> PaymentRepo
  ChatbotSvc --> ChatRepo
  InventorySvc --> InventoryRepo
  UserRepo --> MySQL
  ProductRepo --> MySQL
  OrderRepo --> MySQL
  PaymentRepo --> MySQL
  ChatRepo --> MySQL
  InventoryRepo --> MySQL
  ProductSvc --> S3
  AdminSvc --> S3
  NotificationSvc --> SNS
  ChatbotSvc --> AI

  style Presentation fill:#dbeafe,stroke:#1d4ed8
  style API_Gateway fill:#fef3c7,stroke:#d97706
  style Business fill:#d1fae5,stroke:#059669
  style DataAccess fill:#ede9fe,stroke:#7c3aed
  style Infrastructure fill:#fce7f3,stroke:#db2777
`;

export default function ComponentDiagram() {
  return (
    <DiagramPage
      title="UML Component Diagram"
      description="Depicts the high-level software components of the Spring Boot application, showing interfaces and dependencies across Presentation, Business Logic, Data Access, and Infrastructure layers."
    >
      <MermaidDiagram chart={chart} />
    </DiagramPage>
  );
}
