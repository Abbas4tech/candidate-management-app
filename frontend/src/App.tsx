import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CandidateCard } from "./components/CandidateCard";
import { CandidatePagination } from "./components/CandidatePagination";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Candidate, CandidatesResponse } from "./types/candidate";

const API_BASE_URL = "http://localhost:8000";
const CANDIDATES_PER_PAGE = 5;

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search: searchQuery,
          page: currentPage.toString(),
          limit: CANDIDATES_PER_PAGE.toString(),
        });

        const response = await fetch(
          `${API_BASE_URL}/api/candidates?${params}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const data: CandidatesResponse = await response.json();
        setCandidates(data.candidates);
        setTotalPages(data.total_pages);
        setTotalCandidates(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchCandidates();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar - 200px width */}
      <Sidebar onSearch={handleSearch} onReset={handleReset} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            All Candidates
          </h1>

          {/* Results summary & action buttons */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {totalCandidates} candidate applications
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-sm font-normal h-9 border-gray-300"
              >
                Generate Report
              </Button>
              <Button className="text-sm font-normal h-9 bg-blue-600 hover:bg-blue-700 text-white">
                + Add Candidate
              </Button>
              <Button
                variant="outline"
                className="text-sm font-normal h-9 border-gray-300"
              >
                Bulk Actions
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Summary */}
        {searchQuery && (
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2">
            {searchQuery && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700">Search:</span>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-sm border border-gray-200">
                  <span className="text-xs text-gray-700">{searchQuery}</span>
                  <button
                    onClick={() => handleSearch("")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-red-700 text-sm">
              Error: {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded border border-gray-200 p-8 text-center">
              <p className="text-gray-600 text-sm">Loading candidates...</p>
            </div>
          )}

          {/* Candidate List */}
          {!loading && candidates.length > 0 && (
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              {/* Column Headers */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Name</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Job/Status
                  </p>
                </div>
              </div>

              {/* Candidate Cards */}
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && candidates.length === 0 && (
            <div className="bg-white rounded border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-sm">
                No candidates found. Try adjusting your search filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <CandidatePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
