# ✅ Smart Todo List – Final Submission

This project is a full-stack AI-integrated Todo List web application built using:

- **Backend:** Django + Django REST Framework
- **Frontend:** Next.js + Tailwind CSS
- **AI Logic:** Custom Python-based suggestions (can be upgraded to GPT/LLM)

---

## 📸 Screenshots of the UI

> Save screenshots inside a folder named `screenshots/` in your project and they will show here.

### ➤ Task List Page
![Task List](screenshots/task_list.png)

### ➤ AI Suggestion in Action
![AI Suggestion](screenshots/ai_suggestion.png)

### ➤ API Page View
![API Endpoint](screenshots/api_page.png)

---

## ⚙️ Setup Instructions for Running the Application

### ▶️ Backend (Django)

```bash
cd smart_todo_backend
python -m venv venv
venv\Scripts\activate   # For Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Server: http://127.0.0.1:8000/api/tasks/

▶️ Frontend (Next.js + Tailwind)
bash
Copy
Edit
cd smart_todo_frontend
npm install
npm run dev
App: http://localhost:3000/tasks

📑 API Documentation
🔹 GET /api/tasks/
Returns all tasks.

🔹 POST /api/tasks/
Creates a task with fields: title, description, category, priority_score, deadline, status.

🔹 POST /api/ai/suggest/
Accepts task & context data.
Returns suggested category, deadline, priority score, and enhanced description.

🧾 Example Request
json
Copy
Edit
{
  "task": {
    "title": "Prepare for math exam",
    "description": "Revise algebra and calculus"
  },
  "context": {
    "focus_level": "high",
    "user_mood": "motivated"
  }
}
✅ Example Response
json
Copy
Edit
{
  "priority_score": 0.9,
  "suggested_deadline": "2025-07-07",
  "suggested_category": "Study",
  "enhanced_description": "Revise algebra and calculus (based on task 'Prepare for math exam' and your current context)"
}
🧪 Sample Tasks & AI Suggestions
Field	Sample Input
Title	Finish Resume
Description	Update with latest project and internship
Context	{"focus_level": "medium"}
AI Output	Suggests: Category "Career", Score 0.75

✅ All required sections are included.
📩 Submit your GitHub repo using this form

GitHub Repo: https://github.com/Ayesha0611/smart_todo_list

yaml
Copy
Edit
