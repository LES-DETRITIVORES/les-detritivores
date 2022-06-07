import firebase from "firebase/compat/app";
import router from "next/router";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/functions";
import "firebase/compat/analytics";
import "firebase/compat/database";
import "firebase/messaging";

export class Firebase {
  settings() {
    return {
      apiKey: "AIzaSyAeuEJ6aYJRE1JHzRJgabAAF95MzAGmPic",
      authDomain: "clic-compostnew.firebaseapp.com",
      projectId: "clic-compostnew",
      storageBucket: "clic-compostnew.appspot.com",
      messagingSenderId: "553724034700",
      appId: "1:553724034700:web:0a0b6f732410eb6f6945a9",
      measurementId: "G-BR78123BPV",
    };
  }
  constructor() {
    firebase.initializeApp(this.settings());
    console.log(`Initialize Firebase ${firebase.apps.length} app`);
  }

  user(): firebase.User | null {
    return firebase.auth().currentUser;
  }
  getCurrentUser() {
    return this.user();
  }

  userName(): string | null | undefined {
    return this.user()?.displayName;
  }

  photoUrl(): string | null | undefined {
    return this.user()?.photoURL;
  }

  defaultPhotoUrl(): string {
    return "/static/images/blank-profile.png";
  }

  email(): string {
    return this.user()?.email as string;
  }

  tokenId(force: boolean): Promise<string> | undefined {
    return this.user()?.getIdToken(force);
  }

  userData() {
    return this.getFireStore().collection("users").doc(this.user()?.uid);
  }

  isConnected(): boolean {
    return this.auth().currentUser !== null;
  }

  getStorage() {
    return firebase.storage();
  }

  getFireStore() {
    return firebase.firestore();
  }

  auth() {
    return firebase.auth();
  }

  messaging() {
    return firebase.messaging();
  }

  firebase() {
    return firebase;
  }

  database() {
    return firebase.database();
  }

  analytics() {
    return firebase.analytics();
  }

  functions() {
    return firebase.functions();
  }

  collection(collection: string) {
    return firebase.firestore().collection(collection);
  }
  collectionId(collection: string) {
    return this.collection(collection).doc().id;
  }

  reference(ref: string, child: string) {
    return this.database().ref(ref).child(child);
  }
  emptyString(str: string) {
    return str === "";
  }
  documentPath(collection: string, documentPath: string) {
    return this.collection(collection).doc(documentPath);
  }

  id(): string | undefined {
    return this.user()?.uid;
  }

  stateChanged(callback: (user: firebase.User | null) => void) {
    const auth = this.auth();
    auth.onAuthStateChanged(callback);
  }
  exist(collection: string): boolean {
    this.collection(collection)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.empty;
      });
    return true;
  }

  logOut() {
    return this.auth().signOut();
  }

  getLogs() {
    return this.analytics().logEvent("getLogs");
  }
  async snapshot(collection: string, documentPath: string) {
    return await this.collection(collection)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          if (doc.id === documentPath) {
            return doc.data();
          }
        });
      })
      .then((data) => data)
      .catch((error) => console.log("Error getting documents: ", error));
  }
  async update(collection: string, documentPath: string, data: any) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    await documentRef.update(data);
  }

  async create(collection: string, data: any) {
    const collectionRef = this.collection(collection);
    await collectionRef.add(data);
  }

  async delete(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);

    const documentRef = collectionRef.doc(documentPath);
    await documentRef.delete();
  }

  async get(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get();
  }

  async getAll(collection: string) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get();
  }

  async getAllData(collection: string, data: []) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as never);
      });
      return data;
    });
  }
  async withId(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get().then((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }
  where(
    collection: string,
    field: string,
    operator: firebase.firestore.WhereFilterOp,
    value: string,
  ) {
    return this.collection(collection).where(field, operator, value);
  }
  async orderBy(
    collection: string,
    field: string,
    direction: firebase.firestore.OrderByDirection,
  ) {
    return this.collection(collection).orderBy(field, direction);
  }
  async fetch(collection: string, documentPath: string) {
    const collectionRef = this.collection(collection);
    const documentRef = collectionRef.doc(documentPath);
    return await documentRef.get().then((doc) => {
      return doc.data();
    });
  }

  async fetchAll(collection: string) {
    const collectionRef = this.collection(collection);
    return await collectionRef.get().then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  }

  async getAllByField(collection: string, field: string, value: any) {
    const collectionRef = this.collection(collection);
    return await collectionRef.where(field, "==", value).get();
  }
  async updateUser(name: string, email: string, password: string) {
    const user = this.user();
    await user?.updateProfile({
      displayName: name,
    });
    await user?.updateEmail(email);
    await user?.updatePassword(password);
  }

  async signWith(sign: string) {
    const auth = this.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    switch (sign) {
      case "withPopup":
        await auth.signInWithPopup(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "redirect":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;
      case "redirectAndLink":
        await auth.signInWithRedirect(provider);
        await firebase.auth().getRedirectResult();
        break;

      default:
        break;
    }
  }
}
