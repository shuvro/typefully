from django.db import models

from typefully.apps.drafts.utils.empty_editor_content import (
    make_empty_editor_content,
)


class Draft(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.JSONField(null=True, default=make_empty_editor_content)
    preview = models.CharField(max_length=256, default="")
    tweets = models.JSONField(null=True, default=list)
