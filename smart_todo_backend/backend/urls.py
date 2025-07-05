from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet
from context.views import ContextEntryViewSet
from ai_module.views import AISuggestionView
from django.http import JsonResponse

# Initialize DRF router
router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'context', ContextEntryViewSet)

# Simple default homepage view
def home_view(request):
    return JsonResponse({"message": "Welcome to Smart Todo API"})

# Define URL patterns
urlpatterns = [
    path('', home_view),  # 👈 This handles the root URL `/`
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/ai/suggest/', AISuggestionView.as_view()),
]
