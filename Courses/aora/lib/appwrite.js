import { Try } from "expo-router/build/views/Try";
import { Alert } from "react-native";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.creator.aora",
  projectId: "67a77ae9002e22542577",
  databaseId: "67a77d69001455fbc5c9",
  userCollectionId: "67a77db40016ba5d7c98",
  videoCollectionId: "67a77dff0021000be581",
  storageId: "67a780d5001c84f4c2b0",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account
      .create(ID.unique(), email, password, username)
      
    if (!newAccount) {
      throw new Error("account not Created");
    }

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    console.log("new user created----", newUser)

    return newUser;
  } catch (error) {
    console.log("error creating user account---/---", error);
    // Alert.alert("Error", error.message);
    throw new Error(error);
  }
};

export const SignIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("error signing in to account---", error);
    throw new Error(error);
  }
};


export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }

    console.log("currentAccount----", currentAccount)

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw Error;
    }

    console.log("current User----", currentUser)
    return currentUser.documents[0];
  } catch (error) {
    console.log("Error getting current user---", error)
    return null
  }
};


export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
