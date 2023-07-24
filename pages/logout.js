import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Hapus data admin dari session storage
    sessionStorage.removeItem("admin");

    // Redirect ke halaman login
    router.push("/");
  }, []);

  return null;
};

export default Logout;
