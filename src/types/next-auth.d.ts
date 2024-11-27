// // next-auth.d.ts
// import "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name: string | null;
//       email: string | null;
//       image: string | null;
//       id: string | null;
//     };
//     expires: string | null;
//   }
// }

// next-auth.d.ts
import "next-auth";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}
