from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Optional

app = FastAPI(
    title="Candidate Management API",
    description="API for managing job candidates",
    version="1.0.0"
)

# CORS Configuration (allow frontend to access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      # Vite dev server
        "http://localhost:3000",      # Alternative
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load candidates data
with open('candidates.json', 'r') as f:
    data = json.load(f)
    CANDIDATES = data['candidates']

# ============ ENDPOINTS ============

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Candidate Management API", "docs": "/docs"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "total_candidates": len(CANDIDATES)}

@app.get("/api/candidates")
async def get_candidates(
    search: Optional[str] = Query(None, description="Search by name, position, or company"),
    status: Optional[str] = Query(None, description="Filter by status"),
    application_type: Optional[str] = Query(None, description="Filter by application type"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(5, ge=1, le=100, description="Items per page"),
):
    """
    Get candidates with optional filtering and pagination.
    
    Query Parameters:
    - search: Search by name, position, or company
    - status: Filter by candidate status
    - application_type: Filter by application type (active/inactive)
    - page: Page number (default: 1)
    - limit: Items per page (default: 5)
    """
    filtered = CANDIDATES.copy()
    
    # Search filter
    if search:
        search_lower = search.lower()
        filtered = [
            c for c in filtered
            if (search_lower in c.get('name', '').lower() or
                search_lower in c.get('position', '').lower() or
                search_lower in c.get('company', '').lower())
        ]
    
    # Status filter
    if status:
        filtered = [c for c in filtered if c.get('status', '').lower() == status.lower()]
    
    # Application type filter
    if application_type:
        filtered = [c for c in filtered if c.get('application_type') == application_type]
    
    total = len(filtered)
    
    # Pagination
    skip = (page - 1) * limit
    paginated = filtered[skip : skip + limit]
    
    return {
        "candidates": paginated,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

@app.get("/api/candidates/{candidate_id}")
async def get_candidate(candidate_id: int):
    """Get a specific candidate by ID"""
    for candidate in CANDIDATES:
        if candidate.get('id') == candidate_id:
            return candidate
    return {"error": "Candidate not found"}, 404

# Run: python main.py or uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)