def suggest_task_details(task_data, context_data):
    # Simulated AI logic (you can later connect to OpenAI or LM Studio)
    title = task_data.get("title", "")
    description = task_data.get("description", "")

    return {
        "priority_score": 0.8,
        "suggested_deadline": "2025-07-06",
        "suggested_category": "Work",
        "enhanced_description": f"{description} (based on task '{title}' and your current context)"
    }
