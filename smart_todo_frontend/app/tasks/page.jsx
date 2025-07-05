'use client';
import { useEffect, useState } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [error, setError] = useState(null);

  const fetchTasks = () => {
    fetch('http://127.0.0.1:8000/api/tasks/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error(err);
        setError('Error fetching tasks');
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: aiSuggestion?.suggested_category || 'General',
          priority_score: aiSuggestion?.priority_score || 1.0,
          deadline: aiSuggestion?.suggested_deadline || '2025-12-31',
          status: 'pending',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setForm({ title: '', description: '' });
      setAiSuggestion(null);
    } catch (err) {
      console.error(err);
      setError('Task creation failed.');
    }
  };

  const handleAISuggest = async () => {
    setError(null);
    setAiSuggestion(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/ai/suggest/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: {
            title: form.title,
            description: form.description,
          },
          context: {},
        }),
      });

      if (!res.ok) throw new Error('AI Suggestion failed');
      const data = await res.json();
      setAiSuggestion(data);
    } catch (err) {
      console.error(err);
      setError('Failed to get AI suggestion.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Smart Todo List with AI</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded text-black"
          rows={3}
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAISuggest}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Get AI Suggestion
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>

      {aiSuggestion && (
        <div className="mb-6 p-4 bg-white rounded shadow border-l-4 border-green-500 text-black">
          <h2 className="font-bold text-green-700 mb-2">AI Suggestions:</h2>
          <p><strong>Priority:</strong> {aiSuggestion.priority_score}</p>
          <p><strong>Category:</strong> {aiSuggestion.suggested_category}</p>
          <p><strong>Deadline:</strong> {aiSuggestion.suggested_deadline}</p>
          <p><strong>Description:</strong> {aiSuggestion.enhanced_description}</p>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 rounded shadow border-l-4 border-blue-500 text-black"
          >
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-800">{task.description}</p>
            <p className="text-sm text-gray-600 mt-1">Deadline: {task.deadline}</p>
            <p className="text-sm text-gray-600">Priority: {task.priority_score}</p>
            <p className="text-sm text-gray-600">Category: {task.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
