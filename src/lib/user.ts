import clientPromise, { MONGO } from "@/lib/mongo";
import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  createdAt: Date;
}

export async function getUser(id: string) {
  const client = await clientPromise;

  const response = await client
    .db(MONGO.DATABASE_NAME)
    .collection<{}>("users")
    .findOne({
      _id: new ObjectId(id),
    });

  return response;
}

export async function getUserByEmail(email: string) {}
