import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./CollapsibleSection";

interface SidebarProps {
  onSearch: (query: string) => void;
  onReset: () => void;
}

export function Sidebar({ onSearch, onReset }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {/* Search */}
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-2">
            Search
          </label>
          <Input
            placeholder="Name, position, company..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Filter Sections */}
        <div className="space-y-1">
          <CollapsibleSection title="Application Type" />
          <CollapsibleSection title="Jobs" />
          <CollapsibleSection title="CRM" />
          <CollapsibleSection title="Profile Details" />
          <CollapsibleSection title="Source" />
          <CollapsibleSection title="Responsibility" />
          <CollapsibleSection title="Pipeline Tasks" />
          <CollapsibleSection title="Education" />
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full mt-8" onClick={onReset}>
          Reset All Filters
        </Button>
      </div>
    </aside>
  );
}
