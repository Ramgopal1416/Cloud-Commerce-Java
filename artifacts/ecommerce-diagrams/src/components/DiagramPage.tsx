import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function DiagramPage({ title, description, children }: Props) {
  return (
    <div className="space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1.5 text-sm text-gray-500 max-w-3xl">{description}</p>
      </div>
      <div className="diagram-scroll">{children}</div>
    </div>
  );
}
