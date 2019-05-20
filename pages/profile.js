import { useState, useEffect } from "react";
import { getUserProfile } from "../lib/auth";

export default function Profile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserProfile().then(user => setUser(user));
  }, []);

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
