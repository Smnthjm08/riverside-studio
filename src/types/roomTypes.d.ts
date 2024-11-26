export interface RoomTypes {
    id: string;
    name: string;
    enableChat: boolean;
    isPasswordProtected: boolean;
    password: string;
    maxParticipants: number;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ApiResponseTypes {
    status: number;
    error?: boolean;
    message?: string;
    data?: RoomTypes[];
  }