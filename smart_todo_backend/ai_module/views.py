from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ai_utils import suggest_task_details

class AISuggestionView(APIView):
    def post(self, request):
        task_data = request.data.get("task")
        context_data = request.data.get("context")

        if not task_data:
            return Response({"error": "Missing task data"}, status=400)

        suggestions = suggest_task_details(task_data, context_data)
        return Response(suggestions, status=status.HTTP_200_OK)
