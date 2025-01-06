import { LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { type Editor } from "@tiptap/react";
import { Doc, Id } from "./convex/_generated/dataModel";
import { PaginationStatus, Preloaded } from "convex/react";
import { api } from "./convex/_generated/api";

export interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon | IconType | React.ElementType;
}

export interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export interface EditorProps {
  initialContent?: string | undefined;
}

export interface MarkerProps {
  position: number;
  onMouseDown: () => void;
  onDoubleClick: () => void;
  isDragging: boolean;
  isLeft: boolean;
}

export type TableProps = {
  rows: number;
  cols: number;
};

export interface PDFExportOptions {
  filename?: string;
  margin?: number;
  quality?: number;
  scale?: number;
}

export interface TrailTableProps {
  trails: Doc<"documents">[] | undefined; // Update this to the correct type if known
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}
export interface TrailRowProps {
  trail: Doc<"documents">; // Update this to the correct type if known
}
export interface TrailDropdownProps {
  trailId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

export interface DeleteDialogProps {
  trailId: Id<"documents">;
  children: ReactNode;
}

export interface RenameDialogProps {
  trailId: Id<"documents">;
  children: ReactNode;
  initialTitle: string;
}

export interface AvatarProps {
  src: string;
  name: string;
}

export interface TrailProps {
  preloadedTrail: Preloaded<typeof api.document.getPaperTrailById>;
}

export interface NavProps {
  trailData: Doc<"documents">;
}

export interface TrailIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

export type User = {
  id: string;
  name: string;
  color: string;
  avatar: string;
  role: string;
};
