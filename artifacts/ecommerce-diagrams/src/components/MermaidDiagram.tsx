import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  themeVariables: {
    primaryColor: "#1d4ed8",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#1e40af",
    lineColor: "#374151",
    secondaryColor: "#dbeafe",
    tertiaryColor: "#f0f9ff",
    background: "#ffffff",
    mainBkg: "#dbeafe",
    nodeBorder: "#1e40af",
    clusterBkg: "#f0f9ff",
    titleColor: "#111827",
    edgeLabelBackground: "#ffffff",
    fontFamily: "Inter, Segoe UI, sans-serif",
    fontSize: "14px",
  },
  flowchart: { curve: "basis", useMaxWidth: true },
  sequence: { useMaxWidth: true, boxMargin: 8 },
  er: { useMaxWidth: true },
});

let diagramCounter = 0;

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(`mermaid-${++diagramCounter}`);

  useEffect(() => {
    const render = async () => {
      try {
        const { svg } = await mermaid.render(idRef.current, chart.trim());
        setSvg(svg);
        setError("");
      } catch (e: unknown) {
        setError(String(e));
      }
    };
    render();
    idRef.current = `mermaid-${++diagramCounter}`;
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-mono whitespace-pre-wrap">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
