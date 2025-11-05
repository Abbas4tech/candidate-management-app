import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CandidateCard } from "./components/CandidateCard";
import { CandidatePagination } from "./components/CandidatePagination";
import { Button } from "@/components/ui/button";
import type { Candidate, CandidatesResponse } from "./types/candidate";

const API_BASE_URL = "http://localhost:8000";
const CANDIDATES_PER_PAGE = 5;

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to page 1 on search
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
      {/* Sidebar */}
      <Sidebar onSearch={handleSearch} onReset={handleReset} />
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">All Candidates</h1>
            <p className="text-gray-600 mt-2">
              {candidates.length === 0 && !loading
                ? "No candidates found"
                : `Showing ${candidates.length} of ${candidates.length} candidates on this page`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline">Generate Report</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + Add Candidate
            </Button>
            <Button variant="outline">Bulk Actions</Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
              Error: {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Loading candidates...</p>
            </div>
          )}

          {/* Candidate List */}
          {!loading && candidates.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && candidates.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">
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
