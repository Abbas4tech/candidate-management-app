import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children?: React.ReactNode;
}

export function CollapsibleSection({
  title,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-2 bg-gray-50 text-xs text-gray-600">
          {children || "No options available"}
        </div>
      )}
    </div>
  );
}
