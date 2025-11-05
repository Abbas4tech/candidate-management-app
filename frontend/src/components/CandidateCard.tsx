import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="border-b border-gray-200 px-6 py-5 hover:bg-gray-50 transition-colors">
      {/* Main Row - 2 columns */}
      <div className="grid grid-cols-2 gap-12">
        {/* Left Column - Candidate Info */}
        <div>
          <h3 className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer mb-1">
            {candidate.name}
          </h3>
          <p className="text-xs text-gray-700 mb-0.5">{candidate.position}</p>
          <p className="text-xs text-gray-500">{candidate.company}</p>
        </div>

        {/* Right Column - Job & Status */}
        <div>
          <p className="text-xs text-gray-900 font-medium mb-2">
            {candidate.job_title}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs py-0.5">
              {candidate.status}
            </Badge>
          </div>
          <Button
            variant="link"
            className="text-xs text-blue-600 p-0 h-auto hover:underline"
          >
            {candidate.action_link}
          </Button>
        </div>
      </div>

      {/* Expanded Content - Full Width Below */}
      {(candidate.has_availability || candidate.has_interviews) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-12">
            {/* Availability */}
            {candidate.has_availability && (
              <div>
                <p className="text-xs text-gray-600 mb-1">
                  Availability: {candidate.availability_status}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-blue-600 p-0 h-auto"
                >
                  Request Availability
                </Button>
              </div>
            )}

            {/* Interviews */}
            {candidate.has_interviews && candidate.interviews && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-2">
                  Interviews
                </p>
                <div className="space-y-1">
                  {candidate.interviews.map((interview, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <p className="text-xs text-gray-700">{interview.name}</p>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-xs text-blue-600 p-0 h-auto"
                      >
                        {interview.scheduled ? "Reschedule" : "Schedule"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
