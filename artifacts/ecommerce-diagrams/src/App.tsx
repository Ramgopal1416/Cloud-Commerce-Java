import { useState } from "react";

import DeploymentDiagram from "./pages/DeploymentDiagram";
import ComponentDiagram from "./pages/ComponentDiagram";
import UseCaseDiagram from "./pages/UseCaseDiagram";
import DFDiagram from "./pages/DFDiagram";
import ERDiagram from "./pages/ERDiagram";
import SequenceDiagram from "./pages/SequenceDiagram";
import AWSArchitecture from "./pages/AWSArchitecture";

const diagrams = [
  {
    id: "deployment",
    label: "Deployment Diagram",
    short: "UML Deployment",
    icon: "🏗️",
    component: DeploymentDiagram,
  },
  {
    id: "component",
    label: "Component Diagram",
    short: "UML Component",
    icon: "🧩",
    component: ComponentDiagram,
  },
  {
    id: "usecase",
    label: "Use Case Diagram",
    short: "Use Case",
    icon: "👥",
    component: UseCaseDiagram,
  },
  {
    id: "dfd",
    label: "Data Flow Diagram",
    short: "DFD",
    icon: "🔄",
    component: DFDiagram,
  },
  {
    id: "er",
    label: "ER Diagram",
    short: "Entity-Relationship",
    icon: "🗄️",
    component: ERDiagram,
  },
  {
    id: "sequence",
    label: "Sequence Diagram",
    short: "UML Sequence",
    icon: "📋",
    component: SequenceDiagram,
  },
  {
    id: "aws",
    label: "AWS Architecture",
    short: "Cloud Architecture",
    icon: "☁️",
    component: AWSArchitecture,
  },
];

export default function App() {
  const [active, setActive] = useState("deployment");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const current = diagrams.find((d) => d.id === active)!;
  const ActiveComponent = current.component;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} flex-shrink-0 bg-slate-900 text-white flex flex-col transition-all duration-200`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-base">☁️</div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">E-Commerce Platform</div>
              <div className="text-xs text-slate-400 truncate">Architecture Diagrams</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-slate-400 hover:text-white flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-1 px-2">
          {sidebarOpen && (
            <div className="px-2 pb-1 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Diagrams
            </div>
          )}
          {diagrams.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                active === d.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title={!sidebarOpen ? d.label : undefined}
            >
              <span className="flex-shrink-0 text-base">{d.icon}</span>
              {sidebarOpen && (
                <span className="truncate">{d.label}</span>
              )}
              {sidebarOpen && (
                <span className={`ml-auto text-xs flex-shrink-0 px-1.5 py-0.5 rounded font-mono ${active === d.id ? "bg-blue-500 text-blue-100" : "bg-slate-700 text-slate-400"}`}>
                  {i + 1}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 px-4 py-3">
          {sidebarOpen ? (
            <div className="text-xs text-slate-500 text-center">
              Final Year Engineering Project
              <br />
              Spring Boot · AWS · AI Chatbot
            </div>
          ) : (
            <div className="text-xs text-slate-500 text-center">FYP</div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">{current.icon}</span>
            <div>
              <h1 className="text-base font-bold text-gray-900">{current.label}</h1>
              <p className="text-xs text-gray-500">
                {active === "aws" ? "AWS Architecture" : "UML Diagram"} · Cloud-Based E-Commerce Platform
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex gap-1">
              {diagrams.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`w-2 h-2 rounded-full transition-colors ${active === d.id ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"}`}
                  title={d.label}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-2">
              {diagrams.findIndex((d) => d.id === active) + 1} / {diagrams.length}
            </span>
          </div>
        </header>

        {/* Diagram area */}
        <div className="flex-1 overflow-y-auto p-6">
          <ActiveComponent />
        </div>

        {/* Bottom nav */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center flex-shrink-0">
          <button
            onClick={() => {
              const idx = diagrams.findIndex((d) => d.id === active);
              if (idx > 0) setActive(diagrams[idx - 1].id);
            }}
            disabled={diagrams.findIndex((d) => d.id === active) === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <div className="text-xs text-gray-400">
            {diagrams.findIndex((d) => d.id === active) + 1} of {diagrams.length} diagrams
          </div>
          <button
            onClick={() => {
              const idx = diagrams.findIndex((d) => d.id === active);
              if (idx < diagrams.length - 1) setActive(diagrams[idx + 1].id);
            }}
            disabled={diagrams.findIndex((d) => d.id === active) === diagrams.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
