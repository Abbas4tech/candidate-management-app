import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="border-b border-gray-100 p-6 hover:bg-blue-50 transition-colors duration-150 last:border-b-0">
      <div className="grid grid-cols-3 gap-8">
        {/* Column 1: Candidate Info */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 hover:underline cursor-pointer mb-2">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-700 mb-1">{candidate.position}</p>
          <p className="text-xs text-gray-500">{candidate.company}</p>
        </div>
        {/* Column 2: Job Info */}
        <div>
          <p className="text-sm font-medium text-gray-900 mb-2">
            {candidate.job_title}
          </p>
          <div className="mb-2">
            <Badge
              variant={
                candidate.status.includes("Review")
                  ? "secondary"
                  : candidate.status.includes("Reject")
                  ? "destructive"
                  : "default"
              }
              className="text-xs"
            >
              {candidate.status}
            </Badge>
          </div>
          <Button
            variant="link"
            className="text-sm text-blue-600 p-0 h-auto hover:underline"
          >
            {candidate.action_link} →
          </Button>
        </div>
        {/* Column 3: Actions & Details */}
        <div className="text-right">
          {candidate.has_availability && (
            <div className="mb-3">
              <Badge variant="outline" className="text-xs">
                {candidate.availability_status}
              </Badge>
            </div>
          )}
          {candidate.has_interviews && (
            <Badge variant="outline" className="text-xs">
              {candidate.interviews?.length || 0} Interviews
            </Badge>
          )}
        </div>
      </div>

      {/* Availability Section */}
      {candidate.has_availability && (
        <div className="mt-4 pt-4 border-t border-gray-100 ml-0">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Available: {candidate.availability_status}
            </span>
            <Button variant="link" className="text-blue-600 p-0 h-auto text-xs">
              Request Availability
            </Button>
          </div>
        </div>
      )}

      {/* Interviews Section */}
      {candidate.has_interviews && candidate.interviews && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Interview Stages
          </h4>
          <div className="space-y-2">
            {candidate.interviews.map((interview, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-700">{interview.name}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs text-blue-600"
                  >
                    {interview.scheduled ? "View" : "Schedule"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
