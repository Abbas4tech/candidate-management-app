# Candidate Management Application

A full-stack candidate management interface built with React, TypeScript, TailwindCSS, shadcn/ui, and FastAPI. This application allows users to search, filter, and navigate through a list of job candidates with a modern, responsive UI.

## 🎯 Features

- 🔍 **Smart Search** - Search candidates by name, position, or company with debounced input
- 📄 **Multi-Filter Sidebar** - 8 collapsible filter sections for refined searches
- 📑 **Pagination** - Navigate through candidates (5 per page, 4 pages total)
- 🎨 **Modern UI** - Beautiful interface built with shadcn/ui components
- ⚡ **Fast API** - Responsive FastAPI backend with real-time filtering
- 📊 **Interview Tracking** - View candidate interview stages and availability
- 🎯 **Status Badges** - Visual status indicators for candidate application stages

## 🛠️ Tech Stack

**Frontend:**

- React 18 with TypeScript
- Vite (build tool - fast development)
- TailwindCSS (utility-first styling)
- shadcn/ui (high-quality React components)
- Lucide React (icon library)

**Backend:**

- FastAPI (modern Python web framework)
- Python 3.9+
- Uvicorn (ASGI server)
- Pydantic (data validation)

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/candidate-management-app.git
cd candidate-management-app
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend

# Create virtual environment

python -m venv venv

# Activate (Windows PowerShell)

.\\venv\\Scripts\\Activate.ps1

# Activate (macOS/Linux)

source venv/bin/activate

# Install dependencies

pip install -r requirements.txt

# Start server

python main.py
\`\`\`

Backend runs on: [**http://localhost:8000**](http://localhost:8000)
API Documentation: [**http://localhost:8000/docs**](http://localhost:8000/docs)

### 3. Frontend Setup

Open a new terminal:

\`\`\`bash
cd frontend

# Install dependencies

npm install

# Add shadcn/ui components

npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add collapsible
npx shadcn-ui@latest add pagination

# Start development server

npm run dev
\`\`\`

Frontend runs on: [**http://localhost:5173**](http://localhost:5173)

Open browser to: [**http://localhost:5173**](http://localhost:5173)

## 📂 Project Structure

\`\`\`
candidate-management-app/
├── backend/
│ ├── main.py # FastAPI application
│ ├── candidates.json # Candidate data
│ ├── requirements.txt # Python dependencies
│ └── .gitignore
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ui/ # shadcn/ui components (generated)
│ │ │ ├── CandidateCard.tsx # Main candidate display
│ │ │ ├── CandidatePagination.tsx # Navigation
│ │ │ ├── Sidebar.tsx # Search & filters
│ │ │ └── CollapsibleSection.tsx # Expandable sections
│ │ ├── App.tsx # Main app component
│ │ ├── types.ts # TypeScript interfaces
│ │ └── main.tsx
│ ├── package.json
│ ├── vite.config.ts
│ ├── tailwind.config.js
│ ├── tsconfig.json
│ ├── postcss.config.js
│ └── .gitignore
│
├── .gitignore
└── README.md
\`\`\`

## 🔌 API Endpoints

### Health Check

\`\`\`
GET /health
\`\`\`

Response:
\`\`\`json
{
"status": "healthy",
"total_candidates": 20
}
\`\`\`

### Get Candidates

\`\`\`
GET /api/candidates?search=&page=1&limit=5
\`\`\`

Query Parameters:

- \`search\` (optional) - Search by name, position, or company
- \`status\` (optional) - Filter by status
- \`page\` (default: 1) - Page number
- \`limit\` (default: 5) - Items per page

Response:
\`\`\`json
{
"candidates": [
{
"id": 1,
"name": "Jana Patton",
"position": "Jr. Product Manager",
"company": "Software Alliance Corp.",
"job_title": "Digital Marketing Specialist (O26)",
"status": "Application Review",
"has_interviews": true,
"interviews": [
{
"name": "Initial Screen",
"scheduled": true
}
],
...
}
],
"total": 20,
"page": 1,
"limit": 5,
"total_pages": 4
}
\`\`\`

### Get Single Candidate

\`\`\`
GET /api/candidates/{candidate_id}
\`\`\`

## 🧪 Testing

### Manual Testing Workflow

1. **Start Backend** (Terminal 1)
   \`\`\`bash
   cd backend
   python main.py
   \`\`\`

2. **Start Frontend** (Terminal 2)
   \`\`\`bash
   cd frontend
   npm run dev
   \`\`\`

3. **Test Endpoints** (Terminal 3 - Optional)
   \`\`\`bash

   # Check health

   curl http://localhost:8000/health

   # Search candidates

   curl "http://localhost:8000/api/candidates?search=Jana"

   # Test pagination

   curl "http://localhost:8000/api/candidates?page=2"
   \`\`\`

4. **Test UI Features**
   - Open http://localhost:5173
   - Type in search box
   - Click filter sections to expand/collapse
   - Navigate using pagination buttons
   - View candidate details and interviews

### Verification Checklist

- [ ] Both servers run without errors
- [ ] API endpoints respond correctly
- [ ] Search filters candidates
- [ ] Pagination navigates through pages
- [ ] Candidate cards display correctly
- [ ] Interview sections show when present
- [ ] No console errors in browser
- [ ] No terminal errors

## 🚀 Building for Production

### Build Frontend

\`\`\`bash
cd frontend
npm run build

# Creates optimized dist/ folder

\`\`\`

### Deployment Options

**Frontend (Vercel - Recommended):**

1. Push code to GitHub
2. Connect repository to Vercel
3. Set root directory to \`frontend/\`
4. Deploy automatically

**Backend (Railway/Render):**

1. Connect GitHub repository
2. Select \`backend/\` folder
3. Set runtime to Python 3.9+
4. Add environment: PORT=8000
5. Run command: \`uvicorn main:app --host 0.0.0.0 --port $PORT\`

## 📝 Component Documentation

### CandidateCard

Displays a single candidate with:

- Name, position, company
- Job title and status badge
- Action link
- Interview stages
- Availability status

### CandidatePagination

Navigation component with:

- Previous/Next buttons
- Page number buttons
- Disabled states
- Current page highlight

### Sidebar

Left sidebar filter panel with:

- Search input with debounce
- 8 collapsible filter sections
- Reset button

### CollapsibleSection

Reusable component with:

- Chevron icon rotation animation
- State management
- Smooth transitions

## 🐛 Troubleshooting

**Backend won't start:**
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

**Frontend won't start:**
\`\`\`bash
npm install
npm run dev
\`\`\`

**API connection error:**

- Ensure backend runs on port 8000
- Check CORS in backend main.py
- Restart both servers

**Port already in use:**
\`\`\`bash

# Windows

netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux

lsof -i :8000
kill -9 <PID>
\`\`\`

## 📚 Resources

- [Figma Design](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11)
- [React Documentation](https://react.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Author

Built as a take-home assessment project showcasing full-stack web development skills.

---

**Ready to get started?** Follow the Quick Start guide above!
\`\`\`
