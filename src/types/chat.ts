export type ChatRoom = {
  id: string;
  category: string;
  title: string;
  members: number;
  description: string;
  lastMessage?: string;
  unreadCount?: number;
  lastMessageTime?: string;
  color: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
};

export type ChatMember = {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
};
