from django.urls import include, path
from rest_framework.routers import DefaultRouter

from typefully.apps.drafts.views import DraftsViewSet

router = DefaultRouter()
router.register("drafts", DraftsViewSet, "drafts")

urlpatterns = [
    path("", include(router.urls)),
]
