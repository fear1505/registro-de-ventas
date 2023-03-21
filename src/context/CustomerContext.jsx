import { createContext, useEffect, useState } from "react";

export const CustomerContext = createContext();

import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function CustomerContextProvider({ children }) {
  const [customers, setCustomer] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addNewCustomer = async (client) => {
    if (currentId === "") {
      await addDoc(collection(db, "client"), client);
    } else {
      await updateDoc(doc(db, "client", currentId), client);
    }
  };

  const getCustomer = () => {
    const q = query(collection(db, "client"));
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setCustomer(docs);
    });
  };

  const onDeleteCustomer = async (id) => {
    await deleteDoc(doc(db, "client", id));
  };

  const getCustomerById = async (id, setInitialValues, handleOpen) => {
    const document = await getDoc(doc(db, "client", id));
    handleOpen()
    setInitialValues({ ...document.data() });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        addNewCustomer,
        customers,
        onDeleteCustomer,
        setCurrentId,
        currentId,
        getCustomerById,
        currentId,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
