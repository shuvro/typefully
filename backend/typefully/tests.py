from django.test import TestCase
from rest_framework.test import APIClient, APIRequestFactory, APITestCase

from typefully.apps.drafts.models import Draft

factory = APIRequestFactory()


class DraftsTestCase(APITestCase):
    def test_create_draft(self):
        response = self.client.post(
            "/drafts/",
            {"content": "Hello, world!"},
            format="json",
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_draft(self):
        draft = Draft.objects.create()

        response = self.client.get(f"/drafts/{draft.id}/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], draft.id)

    def test_list_drafts(self):
        Draft.objects.create()
        Draft.objects.create()
        Draft.objects.create()

        response = self.client.get("/drafts/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    def test_update_draft(self):
        draft = Draft.objects.create()

        response = self.client.patch(
            f"/drafts/{draft.id}/",
            {
                "content": {
                    "type": "doc",
                    "content": [
                        {
                            "type": "atom",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [{"type": "text", "text": "abc"}],
                                }
                            ],
                        }
                    ],
                }
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["preview"], "abc")

    def test_delete_draft(self):
        draft = Draft.objects.create()

        response = self.client.delete(f"/drafts/{draft.id}/")

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Draft.objects.filter(id=draft.id).exists())
