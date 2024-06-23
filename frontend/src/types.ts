import type { JSONContent } from "@tiptap/react";

export type Draft = {
  id: number;
  created_at: string;
  updated_at: string;
  content: JSONContent;
  preview: string;
  tweets: [];
};
