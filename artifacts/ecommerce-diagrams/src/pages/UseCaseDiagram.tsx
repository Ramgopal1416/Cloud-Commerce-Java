import DiagramPage from "../components/DiagramPage";

export default function UseCaseDiagram() {
  return (
    <DiagramPage
      title="Use Case Diagram"
      description="Shows the interactions between actors (Customer, Admin, AI Chatbot, Payment Gateway, AWS SNS) and the system's functional use cases across all modules."
    >
      <div className="w-full overflow-auto bg-white rounded-xl border border-gray-200 p-6">
        <svg viewBox="0 0 1100 820" className="w-full" style={{ minWidth: 700 }} xmlns="http://www.w3.org/2000/svg" fontFamily="Inter, Segoe UI, sans-serif">
          <defs>
            <marker id="arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
            </marker>
            <marker id="ext" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
            </marker>
          </defs>

          {/* System boundary */}
          <rect x="200" y="20" width="720" height="780" rx="12" fill="#f8fafc" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="8,4" />
          <text x="560" y="48" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1d4ed8">Cloud-Based E-Commerce Platform System</text>

          {/* ---- Actor: Customer ---- */}
          <g transform="translate(60,140)">
            <ellipse cx="0" cy="-20" rx="18" ry="18" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2"/>
            <line x1="0" y1="-2" x2="0" y2="40" stroke="#1d4ed8" strokeWidth="2"/>
            <line x1="-22" y1="18" x2="22" y2="18" stroke="#1d4ed8" strokeWidth="2"/>
            <line x1="0" y1="40" x2="-18" y2="70" stroke="#1d4ed8" strokeWidth="2"/>
            <line x1="0" y1="40" x2="18" y2="70" stroke="#1d4ed8" strokeWidth="2"/>
            <text x="0" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e3a8a">Customer</text>
          </g>

          {/* ---- Actor: Admin ---- */}
          <g transform="translate(60,500)">
            <ellipse cx="0" cy="-20" rx="18" ry="18" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
            <line x1="0" y1="-2" x2="0" y2="40" stroke="#059669" strokeWidth="2"/>
            <line x1="-22" y1="18" x2="22" y2="18" stroke="#059669" strokeWidth="2"/>
            <line x1="0" y1="40" x2="-18" y2="70" stroke="#059669" strokeWidth="2"/>
            <line x1="0" y1="40" x2="18" y2="70" stroke="#059669" strokeWidth="2"/>
            <text x="0" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="#065f46">Admin</text>
          </g>

          {/* ---- Actor: AI Chatbot ---- */}
          <g transform="translate(1000,200)">
            <ellipse cx="0" cy="-20" rx="18" ry="18" fill="#fce7f3" stroke="#db2777" strokeWidth="2"/>
            <line x1="0" y1="-2" x2="0" y2="40" stroke="#db2777" strokeWidth="2"/>
            <line x1="-22" y1="18" x2="22" y2="18" stroke="#db2777" strokeWidth="2"/>
            <line x1="0" y1="40" x2="-18" y2="70" stroke="#db2777" strokeWidth="2"/>
            <line x1="0" y1="40" x2="18" y2="70" stroke="#db2777" strokeWidth="2"/>
            <text x="0" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9d174d">AI Chatbot</text>
          </g>

          {/* ---- Actor: Payment GW ---- */}
          <g transform="translate(1000,450)">
            <rect x="-28" y="-30" width="56" height="36" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
            <text x="0" y="-7" textAnchor="middle" fontSize="10" fill="#92400e">Payment</text>
            <text x="0" y="7" textAnchor="middle" fontSize="10" fill="#92400e">Gateway</text>
            <text x="0" y="28" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">Ext. System</text>
          </g>

          {/* ---- Actor: AWS SNS ---- */}
          <g transform="translate(1000,620)">
            <rect x="-28" y="-30" width="56" height="36" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
            <text x="0" y="-7" textAnchor="middle" fontSize="10" fill="#4c1d95">AWS SNS</text>
            <text x="0" y="7" textAnchor="middle" fontSize="10" fill="#4c1d95">Notifs</text>
            <text x="0" y="28" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4c1d95">Ext. System</text>
          </g>

          {/* === CUSTOMER USE CASES === */}
          {[
            { y: 80, label: "Register / Login" },
            { y: 135, label: "Browse Products" },
            { y: 190, label: "Search & Filter Products" },
            { y: 245, label: "View Product Details" },
            { y: 300, label: "Manage Shopping Cart" },
            { y: 355, label: "Place Order" },
            { y: 410, label: "Make Payment" },
            { y: 465, label: "Track Order" },
            { y: 520, label: "Chat with AI Assistant" },
            { y: 575, label: "View Order History" },
          ].map(({ y, label }) => (
            <g key={label}>
              <ellipse cx="420" cy={y} rx="130" ry="22" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.5"/>
              <text x="420" y={y + 5} textAnchor="middle" fontSize="12" fill="#1e3a8a">{label}</text>
              <line x1="80" y1="140" x2="290" y2={y} stroke="#1d4ed8" strokeWidth="1" markerEnd="url(#arr)" />
            </g>
          ))}

          {/* === ADMIN USE CASES === */}
          {[
            { y: 430, label: "Manage Products & Inventory" },
            { y: 490, label: "Manage Users" },
            { y: 550, label: "View Orders & Reports" },
            { y: 610, label: "Send Notifications" },
            { y: 670, label: "View Analytics Dashboard" },
            { y: 730, label: "Manage Returns & Refunds" },
          ].map(({ y, label }) => (
            <g key={label}>
              <ellipse cx="620" cy={y} rx="140" ry="22" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
              <text x="620" y={y + 5} textAnchor="middle" fontSize="12" fill="#065f46">{label}</text>
              <line x1="80" y1="500" x2="480" y2={y} stroke="#059669" strokeWidth="1" markerEnd="url(#arr)" />
            </g>
          ))}

          {/* AI Chatbot connections */}
          <line x1="1000" y1="200" x2="920" y2="200" stroke="#db2777" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#ext)" />
          <line x1="900" y1="200" x2="555" y2="300" stroke="#db2777" strokeWidth="1" strokeDasharray="5,3" />
          <line x1="900" y1="200" x2="555" y2="520" stroke="#db2777" strokeWidth="1" strokeDasharray="5,3" />

          {/* Payment GW connections */}
          <line x1="972" y1="425" x2="760" y2="355" stroke="#d97706" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#ext)" />

          {/* AWS SNS connections */}
          <line x1="972" y1="595" x2="760" y2="610" stroke="#7c3aed" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#ext)" />

          {/* Legend */}
          <rect x="215" y="760" width="680" height="32" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
          <line x1="235" y1="776" x2="265" y2="776" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <text x="270" y="780" fontSize="11" fill="#374151">Association</text>
          <line x1="355" y1="776" x2="385" y2="776" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#ext)"/>
          <text x="390" y="780" fontSize="11" fill="#374151">«extend»</text>
          <ellipse cx="520" cy="776" rx="32" ry="11" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1"/>
          <text x="520" y="780" textAnchor="middle" fontSize="10" fill="#1e3a8a">Customer UC</text>
          <ellipse cx="640" cy="776" rx="32" ry="11" fill="#d1fae5" stroke="#059669" strokeWidth="1"/>
          <text x="640" y="780" textAnchor="middle" fontSize="10" fill="#065f46">Admin UC</text>
        </svg>
      </div>
    </DiagramPage>
  );
}
