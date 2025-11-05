# Backend API

FastAPI backend for the Candidate Management application.

## Setup

1. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Documentation

FastAPI provides automatic interactive documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### GET /api/candidates

Get filtered list of candidates.

**Query Parameters:**
- `search` (string, optional) - Search by name, position, or company

**Response:**
```json
{
  "candidates": [...],
  "total": 20
}
```

**Note:** Pagination is handled client-side. This endpoint returns all matching candidates.

## TODO: Implementation Tasks

The main endpoint is partially implemented. You need to add:

1. **Filtering Logic**
   - Filter candidates by search term (check name, position, company)
   - Make search case-insensitive
   - Return all matching candidates

## Example Implementation Hints

### Filtering
```python
# Filter by search term
if search:
    search_lower = search.lower()
    candidates = [
        c for c in candidates
        if search_lower in c['name'].lower()
        or search_lower in c['position'].lower()
        or search_lower in c['company'].lower()
    ]

# Return all matching candidates
return {
    "candidates": candidates,
    "total": len(candidates)
}
```

## Testing

You can test the API using:
- The browser: http://localhost:8000/api/candidates?search=john
- curl: `curl "http://localhost:8000/api/candidates?search=john"`
- The Swagger UI: http://localhost:8000/docs

## Notes

- CORS is already configured for `http://localhost:5173` (Vite's default port)
- The data is loaded from `../mock-data/candidates.json`
- The API returns JSON responses
