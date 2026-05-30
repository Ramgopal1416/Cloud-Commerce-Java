import DiagramPage from "../components/DiagramPage";
import MermaidDiagram from "../components/MermaidDiagram";

const level0 = `
flowchart LR
  Customer(["👤 Customer"]) -->|"Browse, Search,\nOrder, Payment"| System[["☁️ E-Commerce\nPlatform"]]
  System -->|"Products, Order Status,\nNotifications, Chat"| Customer
  Admin(["🔧 Admin"]) -->|"Manage Products,\nOrders, Reports"| System
  System -->|"Dashboard Data,\nAnalytics"| Admin
  System <-->|"Product Images,\nInvoices"| S3[("☁️ AWS S3")]
  System <-->|"User, Product,\nOrder Data"| RDS[("🗄️ AWS RDS\nMySQL")]
  System -->|"Send Notifications"| SNS[("📢 AWS SNS")]
  System <-->|"AI Responses"| AI(["🤖 OpenAI / Bedrock"])

  style Customer fill:#dbeafe,stroke:#1d4ed8
  style Admin fill:#d1fae5,stroke:#059669
  style System fill:#fef3c7,stroke:#d97706,color:#92400e
  style S3 fill:#ede9fe,stroke:#7c3aed
  style RDS fill:#fce7f3,stroke:#db2777
  style SNS fill:#fff7ed,stroke:#ea580c
  style AI fill:#f0fdf4,stroke:#16a34a
`;

const level1 = `
flowchart TB
  Customer(["👤 Customer"])
  Admin(["🔧 Admin"])

  subgraph P1["1.0 User Management"]
    P1a["1.1 Register"]
    P1b["1.2 Login / JWT Auth"]
    P1c["1.3 Profile Update"]
  end

  subgraph P2["2.0 Product Management"]
    P2a["2.1 Add / Edit Product"]
    P2b["2.2 Search & Filter"]
    P2c["2.3 Upload Images → S3"]
  end

  subgraph P3["3.0 Shopping Cart"]
    P3a["3.1 Add to Cart"]
    P3b["3.2 Update / Remove"]
    P3c["3.3 View Cart Total"]
  end

  subgraph P4["4.0 Order Processing"]
    P4a["4.1 Place Order"]
    P4b["4.2 Order Confirmation"]
    P4c["4.3 Track Shipment"]
  end

  subgraph P5["5.0 Payment"]
    P5a["5.1 Payment Request"]
    P5b["5.2 Verify Transaction"]
    P5c["5.3 Generate Invoice"]
  end

  subgraph P6["6.0 Inventory"]
    P6a["6.1 Deduct Stock"]
    P6b["6.2 Low-Stock Alert"]
  end

  subgraph P7["7.0 Notifications (SNS)"]
    P7a["7.1 Order Confirm Email/SMS"]
    P7b["7.2 Shipping Update"]
    P7c["7.3 Low-Stock Alert"]
  end

  subgraph P8["8.0 AI Chatbot"]
    P8a["8.1 Receive Query"]
    P8b["8.2 Query OpenAI/Bedrock"]
    P8c["8.3 Store Chat Log"]
    P8d["8.4 Return Response"]
  end

  D1[("DS1: Users DB")]
  D2[("DS2: Products DB")]
  D3[("DS3: Orders DB")]
  D4[("DS4: Payments DB")]
  D5[("DS5: ChatLogs DB")]
  D6[("DS6: AWS S3")]
  D7[("DS7: AWS SNS")]

  Customer --> P1a
  Customer --> P1b
  P1a --> D1
  P1b --> D1

  Customer --> P2b
  Admin --> P2a
  P2a --> D2
  P2a --> P2c
  P2c --> D6

  Customer --> P3a
  Customer --> P3b
  Customer --> P4a
  P4a --> P4b
  P4a --> D3
  P4a --> P6a
  P4b --> P7a
  P6a --> D2
  P6a --> P6b
  P6b --> P7c
  P4c --> D3

  P4a --> P5a
  P5a --> P5b
  P5b --> D4
  P5b --> P5c
  P5c --> D6

  P7a --> D7
  P7b --> D7
  P7c --> D7

  Customer --> P8a
  P8a --> P8b
  P8b --> P8c
  P8c --> D5
  P8b --> P8d
  P8d --> Customer

  Admin --> P2a
  Admin --> P4c
  Admin --> P6a

  style P1 fill:#dbeafe,stroke:#1d4ed8
  style P2 fill:#d1fae5,stroke:#059669
  style P3 fill:#fef3c7,stroke:#d97706
  style P4 fill:#ede9fe,stroke:#7c3aed
  style P5 fill:#fce7f3,stroke:#db2777
  style P6 fill:#fff7ed,stroke:#ea580c
  style P7 fill:#f0fdf4,stroke:#16a34a
  style P8 fill:#f5f3ff,stroke:#6d28d9
`;

export default function DFDiagram() {
  return (
    <DiagramPage
      title="Data Flow Diagram (DFD)"
      description="Illustrates how data moves through the e-commerce system. Level 0 shows the context diagram; Level 1 expands all internal processes."
    >
      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Level 0</span>
            Context Diagram
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <MermaidDiagram chart={level0} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Level 1</span>
            Expanded Process View
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <MermaidDiagram chart={level1} />
          </div>
        </div>
      </div>
    </DiagramPage>
  );
}
