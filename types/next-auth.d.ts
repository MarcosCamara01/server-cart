import { Session } from "next-auth";

export interface UserDocument {
    email: string;
    password: string;
    name: string;
    phone: string;
    address: AddressDocument;
    image: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

declare module "next-auth" {
    interface Session {
        user: UserDocument;
    }
}