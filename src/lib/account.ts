import clientPromise, { MONGO } from "@/lib/mongo";
import { ObjectId } from "mongodb";

interface Account {
  _id: ObjectId;
  provider: "google";
  type: "oauth";
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  userId: ObjectId;
}

export async function getAccount(userId: ObjectId, provider: "google") {
  const client = await clientPromise;

  const response = await client
    .db(MONGO.DATABASE_NAME)
    .collection<Account>("accounts")
    .findOne({
      userId: new ObjectId(userId),
      provider,
    });

  return response;
}

export async function updateAccount(
  userId: string,
  provider: "google",
  account: Partial<Account>
) {
  const client = await clientPromise;

  const response = await client
    .db(MONGO.DATABASE_NAME)
    .collection<Account>("accounts")
    .findOneAndUpdate(
      { userId: new ObjectId(userId), provider },
      {
        ...account,
      }
    );

  return response;
}

export async function getUserByEmail(email: string) {}
