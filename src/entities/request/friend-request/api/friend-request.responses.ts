export type SendRequestResult =
  | {
      status: "pending";
      request: {
        id: string;
        createdAt: Date;
        sender: {
          id: string;
          email: string;
          username: string;
          avatar: string | null;
          createdAt: Date;
        };
        addressee: {
          id: string;
          email: string;
          username: string;
          avatar: string | null;
          createdAt: Date;
        };
      };
    }
  | {
      status: "accepted";
      friend: {
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        createdAt: Date;
      };
    };
