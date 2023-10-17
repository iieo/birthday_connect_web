import dayjs, { Dayjs } from "dayjs";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export class User {
    friends: User[];
  constructor(public name: string, public birthday: Dayjs) {
    this.name = name;
    this.birthday = birthday;
    this.friends = [];
  }

  static async fetchProfile(authId: string): Promise<User | undefined> {
    try {
      const userDoc = await getDoc(doc(collection(db, "users"), authId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user = new User(userData.name, dayjs(userData.birthday));
        return user;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  async saveProfile(): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No user is currently logged in.");
      return;
    }

    const user = new User(this.name, this.birthday);
    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        name: user.name,
        birthday: user.birthday.toISOString(),
      });
      console.log("User profile updated.");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }
}
