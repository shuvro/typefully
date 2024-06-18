from rest_framework import serializers, viewsets
from typefully.apps.drafts.utils.rich_text_to_text import rich_text_to_text

from .models import Draft


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ["id", "preview", "content"]


class DraftsViewSet(viewsets.ModelViewSet):
    queryset = Draft.objects.all().order_by("-id")
    serializer_class = DraftSerializer

    def perform_update(self, serializer):
        extra_save_args = {}
        validated_data = serializer.validated_data

        if "content" in validated_data:
            content = validated_data["content"]
            preview = rich_text_to_text(content)[:100]
            extra_save_args["preview"] = preview.strip()

        serializer.save(**extra_save_args)
