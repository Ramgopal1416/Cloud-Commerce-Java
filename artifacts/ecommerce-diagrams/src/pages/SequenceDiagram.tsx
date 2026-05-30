import DiagramPage from "../components/DiagramPage";
import MermaidDiagram from "../components/MermaidDiagram";

const orderFlow = `
sequenceDiagram
  autonumber
  actor Customer
  participant Browser as Web Browser
  participant ALB as AWS ALB
  participant AuthFilter as JWT Auth Filter
  participant UserSvc as User Service
  participant ProductSvc as Product Service
  participant CartSvc as Cart Service
  participant OrderSvc as Order Service
  participant PaymentSvc as Payment Service
  participant InventorySvc as Inventory Service
  participant NotifSvc as Notification Service
  participant DB as AWS RDS (MySQL)
  participant S3 as AWS S3
  participant SNS as AWS SNS
  participant PG as Payment Gateway

  Customer->>Browser: Open e-commerce website
  Browser->>ALB: GET /products (HTTPS)
  ALB->>AuthFilter: Forward request
  AuthFilter->>ProductSvc: Validate (public endpoint)
  ProductSvc->>DB: SELECT products WHERE active=true
  DB-->>ProductSvc: Product list
  ProductSvc-->>Browser: JSON product catalogue

  Customer->>Browser: Login with credentials
  Browser->>ALB: POST /api/auth/login
  ALB->>AuthFilter: Forward
  AuthFilter->>UserSvc: Authenticate credentials
  UserSvc->>DB: SELECT user WHERE email=?
  DB-->>UserSvc: User record
  UserSvc-->>Browser: JWT access token + refresh token

  Customer->>Browser: Add product to cart
  Browser->>ALB: POST /api/cart/add (Bearer JWT)
  ALB->>AuthFilter: Validate JWT token
  AuthFilter-->>ALB: Token valid, userId extracted
  ALB->>CartSvc: Add item to cart
  CartSvc->>DB: INSERT cart_items
  DB-->>CartSvc: Cart updated
  CartSvc-->>Browser: Cart summary

  Customer->>Browser: Place Order
  Browser->>ALB: POST /api/orders (Bearer JWT)
  ALB->>OrderSvc: Create order
  OrderSvc->>DB: BEGIN TRANSACTION
  OrderSvc->>DB: INSERT orders
  OrderSvc->>InventorySvc: Reserve stock
  InventorySvc->>DB: UPDATE inventory SET qty = qty - ordered
  DB-->>InventorySvc: Stock reserved

  OrderSvc->>PaymentSvc: Initiate payment
  PaymentSvc->>PG: POST /charge (amount, card)
  PG-->>PaymentSvc: Payment success + txn_id
  PaymentSvc->>DB: INSERT payments (COMPLETED)
  DB-->>PaymentSvc: Payment saved
  PaymentSvc->>S3: Store invoice PDF
  S3-->>PaymentSvc: Invoice URL

  OrderSvc->>DB: UPDATE orders SET status=CONFIRMED
  OrderSvc->>DB: COMMIT TRANSACTION
  DB-->>OrderSvc: Transaction committed

  OrderSvc->>NotifSvc: Trigger ORDER_CONFIRM
  NotifSvc->>SNS: Publish order confirmation
  SNS-->>Customer: Email + SMS notification
  OrderSvc-->>Browser: Order ID + status: CONFIRMED
`;

const chatbotFlow = `
sequenceDiagram
  autonumber
  actor Customer
  participant Widget as Chatbot Widget
  participant ALB as AWS ALB
  participant ChatSvc as Chatbot Service
  participant DB as Chat Log DB
  participant AI as OpenAI / AWS Bedrock
  participant ProductSvc as Product Service

  Customer->>Widget: Type: "Show me laptops under $800"
  Widget->>ALB: POST /api/chatbot/message (JWT)
  ALB->>ChatSvc: Forward message + userId + sessionId
  ChatSvc->>DB: Fetch last 10 messages for context
  DB-->>ChatSvc: Chat history

  ChatSvc->>ProductSvc: Search products (category=laptop, maxPrice=800)
  ProductSvc-->>ChatSvc: Matching product list

  ChatSvc->>AI: POST /chat/completions\n{messages: context + products}
  AI-->>ChatSvc: AI-generated recommendation text

  ChatSvc->>DB: INSERT chat_log (user_message, bot_response, intent)
  DB-->>ChatSvc: Logged

  ChatSvc-->>Widget: Structured response + product cards
  Widget-->>Customer: Display recommendations + Buy Now links
`;

export default function SequenceDiagram() {
  return (
    <DiagramPage
      title="Sequence Diagram"
      description="Detailed interaction flows between system components, showing message passing with timestamps. Covers the end-to-end Order Placement flow and the AI Chatbot interaction sequence."
    >
      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Flow 1</span>
            Order Placement — End-to-End
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <MermaidDiagram chart={orderFlow} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded">Flow 2</span>
            AI Chatbot Interaction
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <MermaidDiagram chart={chatbotFlow} />
          </div>
        </div>
      </div>
    </DiagramPage>
  );
}
