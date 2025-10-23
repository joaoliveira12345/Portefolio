import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Home from "./home";
import Login from "../Login";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // If firebase wasn't initialized (auth === null) skip the listener
    if (!auth) {
      setUser(null);
      setReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setReady(true);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [auth]);

  if (!ready) return <div style={{ padding: 20 }}>Loading...</div>;

  return <div>{user ? <Home /> : <Login />}</div>;
};

export default Dashboard;