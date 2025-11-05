import { type Candidate } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="border-b border-gray-200 px-4 py-5">
      {/* Main Row - Name, Position, Company on left | Job Title, Status, Action on right */}
      <div className="grid grid-cols-2 gap-12">
        {/* Left Column - Candidate Info */}
        <div>
          <h3 className="text-xl font-normal text-blue-600 hover:underline cursor-pointer">
            {candidate.name}
          </h3>
          <p className="text-base font-normal text-gray-600 mt-1">
            {candidate.position}
          </p>
          <p className="text-base font-normal text-gray-600">
            {candidate.company}
          </p>
        </div>

        {/* Right Column - Job & Status */}
        <div>
          <p className="text-sm font-normal text-gray-900 mb-1">
            {candidate.job_title}
          </p>
          <div className="flex items-center gap-3 mb-2">
            <Badge
              variant="outline"
              className="px-2.5 py-1 text-xs font-normal rounded-sm border-gray-200"
            >
              {candidate.status}
            </Badge>
          </div>
          <a
            href="#"
            className="text-sm font-normal text-blue-600 hover:underline"
          >
            {candidate.action_link}
          </a>
        </div>
      </div>

      {/* Availability Section - Only if has_availability */}
      {candidate.has_availability && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <p className="text-sm font-normal text-gray-600">Availability</p>
              <Badge
                variant="secondary"
                className="inline-block mt-1 px-2.5 py-1 text-xs font-normal bg-gray-100 text-gray-700 rounded-sm"
              >
                {candidate.availability_status || "Not Specified"}
              </Badge>
            </div>
            <a
              href="#"
              className="text-sm font-normal text-blue-600 hover:underline"
            >
              Request Availability
            </a>
          </div>
        </div>
      )}

      {/* Interviews Section - Only if has_interviews */}
      {candidate.has_interviews &&
        candidate.interviews &&
        candidate.interviews.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {candidate.interviews.map((interview, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-2 px-1 ${
                  index !== candidate.interviews!.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <span className="text-xs font-normal text-gray-700">
                  {interview.name}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="#"
                    className="text-xs font-normal text-blue-600 hover:underline"
                  >
                    Schedule manually
                  </a>
                  <span className="text-xs text-gray-600">|</span>
                  <a
                    href="#"
                    className="text-xs font-normal text-blue-600 hover:underline"
                  >
                    Automated scheduling
                  </a>
                  <button className="text-gray-400 hover:text-gray-600 p-1 ml-2">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
