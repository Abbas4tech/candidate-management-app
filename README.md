# Frontend Take-Home Assessment

Welcome! This assessment is designed to evaluate your skills in React, TypeScript, TailwindCSS, and FastAPI.

## Time Expectation

**1 hour and 30 minutes**. We understand this is limited time, so focus on:
1. Core functionality working correctly
2. Clean component structure
3. Visual accuracy to the design

## Overview

You'll be building a candidate management interface inspired by Greenhouse's "All Candidates" page. This assessment focuses on:
- Translating designs into well-organized React components
- Implementing interactive filtering and pagination
- Creating FastAPI endpoints with query parameters
- Styling with TailwindCSS to match the provided design

## What You'll Build

A candidate listing page with:
- **Left Sidebar**: Search input, filters (dropdown + collapsible sections), reset button
- **Main Content**: Candidate list with name, position, job, status, and interview stages
- **Pagination**: Navigate through 4 pages of candidates
- **Backend**: FastAPI endpoint that handles search filtering

## What's Provided

### Pre-Built for You
- ✅ **Sidebar component** with search input, toggle, dropdown, reset button
- ✅ **SearchInput component** with 300ms debounce
- 🔶 **CollapsibleSection skeleton** (needs state management)
- ✅ **Configured React + TypeScript + TailwindCSS project**
- ✅ **Configured FastAPI starter** with CORS and data loading
- ✅ **Mock data JSON** with 20 candidates
- ✅ **Design specifications** (colors, spacing, typography)
- ✅ **TypeScript type definitions** for all data structures

### What You Build
- Complete the CollapsibleSection component (add state + expand/collapse logic)
- 8 filter sections using CollapsibleSection in the sidebar (visual only)
- Action buttons (Generate Report, Add Candidate, Bulk Actions - visual only)
- Candidate card components matching the design exactly
- Pagination component with working navigation (client-side)
- FastAPI endpoint with search filtering

## Getting Started

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173`

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will run on `http://localhost:8000`

## Requirements

See [REQUIREMENTS.md](./REQUIREMENTS.md) for detailed step-by-step requirements.

### Core Requirements (Must Complete)

1. **Filter Sections in Sidebar**
   - Complete the `CollapsibleSection.tsx` component (add state, toggle, conditional rendering)
   - Add 8 CollapsibleSection components to the Sidebar's filter area
   - Sections: Application Type, Jobs, CRM, Profile Details, Source, Responsibility, Pipeline Tasks, Education
   - Chevron should rotate 90deg (point right when collapsed, down when expanded)
   - **Note**: Filters are visual only for core requirements

2. **Candidate List** - **Main Focus**
   - Build CandidateCard component matching the design exactly
   - Display: name (link), position, company, job title, status
   - Include interview stages section for candidates with interviews
   - Match spacing, colors, and typography from Figma precisely
   - Display 5 candidates per page

3. **Action Buttons**
   - "Generate Report", "+ Add Candidate", "Bulk Actions" buttons
   - Visual only, no functionality needed

4. **Pagination**
   - Build Pagination component showing pages 1, 2, 3, 4
   - Highlight current page
   - Navigate between pages (MUST WORK - updates candidate list)
   - Use client-side pagination (slice array in frontend)

5. **FastAPI Backend**
   - `GET /api/candidates` endpoint
   - Support `search` query parameter
   - Implement search filtering (name, position, company)
   - Return all matching candidates (pagination handled client-side)

### Stretch Goals (If Time Permits)

- Working dropdown sort functionality
- Loading states when fetching data
- Working filter sections (expand/collapse + filtering)
- Filter tags that show active filters
- Hover animations and transitions
- Mobile responsive layout

## Design Files

- **Reference Design (Figma)**: [View Figma File](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)
  - This is the exact design you should replicate
  - Focus on the "All Candidates Page" section
- **Design Specs**: See `designs/specs.md` for colors, spacing, typography
- **Screenshots**: See `designs/` folder for exported screenshots

## Evaluation Criteria

Your submission will be evaluated on:

### 1. Visual Accuracy (25 points)
- CandidateCard matches design spacing, colors, and typography (15 pts)
- Filter sections styled correctly with expand/collapse functionality (7 pts)
- Pagination matches design (3 pts)
- Proper use of TailwindCSS utilities
- Note: We evaluate designs visually. Your implementation should closely approximate the Figma reference - exact pixel perfection is not required
- Bonus: All 8 filter sections implemented (+2 pts)

### 2. Component Structure (25 points)
- Well-organized, modular components
- Logical component hierarchy for CandidateCard
- Reusable components where appropriate
- Clean file structure

### 3. Functionality (35 points)
- Search filtering works correctly (debounced)
- Pagination works (correct page changes, correct candidates shown)
- Backend endpoint implements search and pagination correctly
- Candidates display with all required information
- Interview stages display for applicable candidates

### 4. TypeScript Usage (15 points)
- Proper type definitions for all props
- **No use of `any` type** (explicit or implicit)
- Correct typing for API responses
- Good use of interfaces/types

### Bonus Points
- Clean, readable code
- Helpful comments where needed
- Good error handling
- Accessibility considerations

## Submission

When complete:

1. **Test your code**
   - Ensure both frontend and backend run without errors
   - Test all filter and pagination functionality

2. **Document any incomplete features** in `NOTES.md`
   - What you completed
   - What you would do with more time
   - Any libraries you added and why

3. **Zip the project**
   - Delete `node_modules/` and `venv/` before zipping
   - Keep `.git` folder if you used git

4. **Email it back to us**

## Notes

- You may use any additional packages if needed (just explain why in NOTES.md)
- Focus on the provided stack (React, TypeScript, TailwindCSS, FastAPI)
- We're not expecting perfection - show us your problem-solving approach
- If you use AI tools, that's fine! Just note which tools and how you used them

## Questions?

If you have questions during the assessment, please reach out to [your-email@company.com].

Good luck! We're excited to see what you build.
