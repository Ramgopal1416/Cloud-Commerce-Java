import DiagramPage from "../components/DiagramPage";
import MermaidDiagram from "../components/MermaidDiagram";

const chart = `
graph TB
  subgraph Client["Client Layer"]
    Browser["🌐 Web Browser\n(Customer / Admin)"]
  end

  subgraph Internet["Internet"]
    HTTPS["HTTPS / TLS 1.3"]
  end

  subgraph AWS_Region["AWS Region: us-east-1"]

    subgraph VPC["Virtual Private Cloud (VPC)"]

      subgraph PublicSubnet["Public Subnet"]
        ALB["Application Load Balancer\n(AWS ALB)"]
        EC2["AWS EC2 Instance\nAmazon Linux 2\nJava 17 + Spring Boot\n:8080"]
      end

      subgraph PrivateSubnet["Private Subnet"]
        RDS_Primary["AWS RDS Primary\nMySQL 8.0\n:3306\n[Users, Products,\nOrders, Inventory,\nPayments, ChatLogs]"]
        RDS_Replica["AWS RDS Read Replica\nMySQL 8.0\n:3306"]
      end

    end

    subgraph StorageServices["AWS Storage & Messaging"]
      S3["AWS S3 Bucket\n[Product Images,\nInvoices, Reports,\nDocuments]"]
      SNS["AWS SNS\n[Order Confirmation,\nShipping Updates,\nLow-Stock Alerts]"]
    end

    subgraph AI_Service["AI / ML Services"]
      Bedrock["AWS Bedrock / OpenAI API\nAI Chatbot Engine"]
    end

    subgraph Security["Security & Auth"]
      IAM["AWS IAM\n(Roles & Policies)"]
      CW["AWS CloudWatch\n(Logs & Metrics)"]
    end

  end

  subgraph Notifications["Notification Channels"]
    Email["Email (SES)"]
    SMS["SMS"]
    Push["Push Notification"]
  end

  Browser -->|HTTPS| HTTPS
  HTTPS --> ALB
  ALB -->|Forward| EC2
  EC2 -->|JDBC| RDS_Primary
  RDS_Primary -->|Replication| RDS_Replica
  EC2 -->|SDK| S3
  EC2 -->|Publish| SNS
  EC2 -->|REST API| Bedrock
  EC2 --> IAM
  EC2 --> CW
  SNS --> Email
  SNS --> SMS
  SNS --> Push

  style Client fill:#dbeafe,stroke:#1d4ed8
  style PublicSubnet fill:#d1fae5,stroke:#059669
  style PrivateSubnet fill:#fef3c7,stroke:#d97706
  style StorageServices fill:#ede9fe,stroke:#7c3aed
  style AI_Service fill:#fce7f3,stroke:#db2777
  style Security fill:#f0f9ff,stroke:#0284c7
  style Notifications fill:#fff7ed,stroke:#ea580c
`;

export default function DeploymentDiagram() {
  return (
    <DiagramPage
      title="UML Deployment Diagram"
      description="Shows the physical deployment of the e-commerce system on AWS infrastructure, including EC2, RDS (MySQL), S3, SNS, and AI services within a VPC."
    >
      <MermaidDiagram chart={chart} />
    </DiagramPage>
  );
}
