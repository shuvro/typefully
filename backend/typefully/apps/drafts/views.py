from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from typefully.apps.drafts.utils.rich_text_to_text import rich_text_to_text

from .models import Draft
from .utils.text_splitter import auto_split_into_meaningful_chunks


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = ["id", "preview", "content", "tweets"]


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

    @action(detail=False, methods=['post'], url_path='split-text', url_name='split-text')
    def split_text(self, request):
        draft_id = request.data.get('draft_id')

        if not draft_id:
            return Response({'error': 'No draft id provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            draft = Draft.objects.get(id=draft_id)
        except Draft.DoesNotExist:
            return Response({'error': 'Draft not found'}, status=status.HTTP_404_NOT_FOUND)

        plain_text_content = rich_text_to_text(draft.content)
        chunks = auto_split_into_meaningful_chunks(plain_text_content)

        draft.tweets = chunks  # Save the chunks in the tweets field
        draft.save()

        return Response({'draft': DraftSerializer(draft).data}, status=status.HTTP_200_OK)
