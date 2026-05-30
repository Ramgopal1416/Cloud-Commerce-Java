import DiagramPage from "../components/DiagramPage";

function AwsIcon({ label, icon, color, bg }: { label: string; icon: string; color: string; bg: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-24">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md border-2"
        style={{ background: bg, borderColor: color }}
      >
        {icon}
      </div>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function ServiceBox({
  title,
  color,
  bg,
  borderColor,
  children,
}: {
  title: string;
  color: string;
  bg: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-5 border-2" style={{ background: bg, borderColor }}>
      <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 mx-2">
      <div className="h-8 w-px bg-gray-400 border-l-2 border-dashed border-gray-400" />
      <span className="text-xs text-gray-500 text-center leading-tight">{label}</span>
      <div className="h-8 w-px bg-gray-400 border-l-2 border-dashed border-gray-400" />
      <div className="w-3 h-3 border-r-2 border-b-2 border-gray-500 rotate-45 -mt-3" />
    </div>
  );
}

function HArrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-8 h-px bg-gray-400" />
      <span className="text-xs text-gray-500 whitespace-nowrap">{label}</span>
      <div className="w-8 h-px bg-gray-400" />
      <div className="w-3 h-3 border-r-2 border-b-2 border-gray-500 -rotate-45 -ml-2.5" />
    </div>
  );
}

export default function AWSArchitecture() {
  return (
    <DiagramPage
      title="AWS Cloud Architecture Diagram"
      description="Enterprise-grade AWS architecture showing all services, their interconnections, and the deployment topology for the cloud-based e-commerce platform."
    >
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-blue-200 p-6 overflow-auto">
        <div className="min-w-[900px]">

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-900">AWS Cloud Architecture</h2>
            <p className="text-sm text-gray-500">Cloud-Based E-Commerce Platform</p>
          </div>

          {/* Users */}
          <div className="flex justify-center gap-10 mb-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center text-2xl">👤</div>
              <span className="text-xs font-semibold text-blue-700">Customer</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center text-2xl">🔧</div>
              <span className="text-xs font-semibold text-green-700">Admin</span>
            </div>
          </div>

          <div className="flex justify-center mb-2">
            <div className="text-center">
              <div className="text-xs text-gray-500">HTTPS / TLS 1.3</div>
              <div className="flex justify-center">
                <div className="w-px h-6 bg-gray-400" />
              </div>
            </div>
          </div>

          {/* AWS Region box */}
          <div className="rounded-3xl border-2 border-orange-400 bg-orange-50/50 p-5">
            <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">☁️ AWS Region: us-east-1</div>

            {/* ALB */}
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center gap-1 bg-white rounded-xl border-2 border-yellow-400 px-6 py-3 shadow">
                <span className="text-2xl">⚖️</span>
                <span className="text-xs font-bold text-yellow-700">Application Load Balancer</span>
                <span className="text-xs text-gray-500">AWS ALB</span>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="w-px h-5 bg-gray-400" />
            </div>

            {/* VPC */}
            <div className="rounded-2xl border-2 border-blue-400 bg-blue-50/50 p-4 mb-4">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">🔒 Virtual Private Cloud (VPC)</div>

              <div className="grid grid-cols-2 gap-4">
                {/* Public Subnet */}
                <ServiceBox title="🌐 Public Subnet" color="#047857" bg="#f0fdf4" borderColor="#34d399">
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center gap-1 bg-white rounded-xl border-2 border-green-400 px-4 py-3 shadow w-full">
                      <span className="text-xl">🖥️</span>
                      <span className="text-xs font-bold text-green-800">AWS EC2 Instance</span>
                      <span className="text-xs text-gray-500 text-center">Amazon Linux 2</span>
                      <span className="text-xs text-gray-500 text-center">Java 17 + Spring Boot</span>
                      <div className="mt-2 flex flex-wrap gap-1 justify-center">
                        {["User Svc","Product Svc","Cart Svc","Order Svc","Payment Svc","Inventory Svc","Chatbot Svc","Admin Svc","Notification Svc"].map(s => (
                          <span key={s} className="bg-green-100 text-green-800 text-xs rounded px-1.5 py-0.5">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ServiceBox>

                {/* Private Subnet */}
                <ServiceBox title="🔐 Private Subnet" color="#7c3aed" bg="#faf5ff" borderColor="#a78bfa">
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl border-2 border-purple-300 px-3 py-2 shadow text-center">
                      <span className="text-xl">🗄️</span>
                      <div className="text-xs font-bold text-purple-800">AWS RDS Primary</div>
                      <div className="text-xs text-gray-500">MySQL 8.0 — Port 3306</div>
                      <div className="flex flex-wrap gap-1 mt-1 justify-center">
                        {["Users","Products","Orders","Inventory","Payments","ChatLogs"].map(t => (
                          <span key={t} className="bg-purple-100 text-purple-700 text-xs rounded px-1 py-0.5">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border-2 border-purple-200 px-3 py-2 shadow text-center opacity-80">
                      <span className="text-xl">🗄️</span>
                      <div className="text-xs font-bold text-purple-700">RDS Read Replica</div>
                      <div className="text-xs text-gray-500">Read-only queries</div>
                    </div>
                  </div>
                </ServiceBox>
              </div>
            </div>

            {/* AWS Managed Services */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <ServiceBox title="📦 Object Storage" color="#1d4ed8" bg="#eff6ff" borderColor="#93c5fd">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">🪣</span>
                  <span className="text-xs font-bold text-blue-800">AWS S3 Bucket</span>
                  <div className="flex flex-col gap-0.5 text-xs text-gray-600 text-center mt-1">
                    <span>• Product Images</span>
                    <span>• PDF Invoices</span>
                    <span>• Reports & Docs</span>
                  </div>
                </div>
              </ServiceBox>

              <ServiceBox title="📣 Messaging" color="#d97706" bg="#fffbeb" borderColor="#fcd34d">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">📢</span>
                  <span className="text-xs font-bold text-yellow-800">AWS SNS</span>
                  <div className="flex flex-col gap-0.5 text-xs text-gray-600 text-center mt-1">
                    <span>• Order Confirmations</span>
                    <span>• Shipping Updates</span>
                    <span>• Low-Stock Alerts</span>
                  </div>
                </div>
              </ServiceBox>

              <ServiceBox title="🤖 AI / ML" color="#db2777" bg="#fdf2f8" borderColor="#f9a8d4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">🧠</span>
                  <span className="text-xs font-bold text-pink-800">AWS Bedrock</span>
                  <div className="text-xs text-gray-500 text-center">or OpenAI API</div>
                  <div className="flex flex-col gap-0.5 text-xs text-gray-600 text-center mt-1">
                    <span>• Product Q&amp;A</span>
                    <span>• Recommendations</span>
                    <span>• Customer Support</span>
                  </div>
                </div>
              </ServiceBox>
            </div>

            {/* Monitoring & Security */}
            <div className="grid grid-cols-2 gap-4">
              <ServiceBox title="🔑 Security" color="#374151" bg="#f9fafb" borderColor="#9ca3af">
                <div className="flex justify-center gap-4">
                  <AwsIcon label="AWS IAM" icon="🛡️" color="#374151" bg="#f3f4f6" />
                  <AwsIcon label="JWT Auth" icon="🔐" color="#374151" bg="#f3f4f6" />
                </div>
              </ServiceBox>
              <ServiceBox title="📊 Monitoring" color="#0369a1" bg="#f0f9ff" borderColor="#7dd3fc">
                <div className="flex justify-center gap-4">
                  <AwsIcon label="CloudWatch" icon="📊" color="#0369a1" bg="#e0f2fe" />
                  <AwsIcon label="CloudTrail" icon="🗒️" color="#0369a1" bg="#e0f2fe" />
                </div>
              </ServiceBox>
            </div>
          </div>

          {/* Notification destinations */}
          <div className="mt-4">
            <div className="flex justify-center mb-2 text-xs text-gray-500">SNS delivers to →</div>
            <div className="flex justify-center gap-8">
              {[
                { icon: "📧", label: "Email (SES)", color: "#1d4ed8", bg: "#dbeafe", border: "#93c5fd" },
                { icon: "📱", label: "SMS", color: "#059669", bg: "#d1fae5", border: "#6ee7b7" },
                { icon: "🔔", label: "Push Notif.", color: "#d97706", bg: "#fef3c7", border: "#fcd34d" },
              ].map(({ icon, label, color, bg, border }) => (
                <div key={label} className="flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-2 text-sm font-semibold" style={{ background: bg, borderColor: border, color }}>
                  <span className="text-xl">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Connection legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-gray-600">
            <div className="flex items-center gap-1.5"><div className="w-6 h-px border-t-2 border-blue-500" /><span>HTTPS/TLS</span></div>
            <div className="flex items-center gap-1.5"><div className="w-6 h-px border-t-2 border-purple-500" /><span>JDBC/SQL</span></div>
            <div className="flex items-center gap-1.5"><div className="w-6 h-px border-t-2 border-green-500 border-dashed" /><span>AWS SDK</span></div>
            <div className="flex items-center gap-1.5"><div className="w-6 h-px border-t-2 border-orange-500" /><span>REST API</span></div>
            <div className="flex items-center gap-1.5"><div className="w-6 h-px border-t-2 border-gray-400 border-dashed" /><span>DB Replication</span></div>
          </div>
        </div>
      </div>
    </DiagramPage>
  );
}
