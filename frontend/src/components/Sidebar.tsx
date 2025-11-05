import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CollapsibleSection } from "./CollapsibleSection";
import { Search, RotateCcw } from "lucide-react";

interface SidebarProps {
  onSearch: (query: string) => void;
  onReset: () => void;
}

export function Sidebar({ onSearch, onReset }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [fullTextSearch, setFullTextSearch] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleReset = () => {
    setSearchQuery("");
    setFullTextSearch(false);
    onReset();
  };

  return (
    <aside className="w-52 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      {/* Search Input - 200px width, 32px height */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-600" />
          <Input
            placeholder="Search candidates"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8 h-8 text-sm border-gray-300 rounded-sm focus:border-blue-600"
          />
        </div>
      </div>

      {/* Full Text Search Toggle */}
      <div className="px-4 py-3 border-b border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={fullTextSearch}
            onChange={(e) => setFullTextSearch(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-xs font-normal text-gray-700">
            Full Text Search
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-1">Includes resumes and notes</p>
      </div>

      {/* Collapsible Sections */}
      <div className="px-0">
        <div className="border-b border-gray-200 px-4 py-3">
          <p className="text-xs font-semibold text-gray-900">
            Last Activity (new to old)
          </p>
        </div>

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
      <div className="px-4 py-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full text-xs font-normal h-9 text-blue-600 hover:text-blue-700"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
