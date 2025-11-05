import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./CollapsibleSection";
import { Search, X } from "lucide-react";

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

  const handleReset = () => {
    setSearchQuery("");
    onReset();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute text-accent left-2 top-1/2 -translate-y-1/2"
            />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-xs pl-8 h-9"
            ></Input>
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Sections */}
        <div className="space-y-0">
          <CollapsibleSection title="Application Type" />
          <CollapsibleSection title="Jobs" />
          <CollapsibleSection title="CRM" />
          <CollapsibleSection title="Profile Details" />
          <CollapsibleSection title="Source" />
          <CollapsibleSection title="Responsibility" />
          <CollapsibleSection title="Pipeline Tasks" />
          <CollapsibleSection title="Education" />
        </div>
      </div>

      {/* Footer - Reset Button */}
      <div className="px-4 py-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full text-xs h-9"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
