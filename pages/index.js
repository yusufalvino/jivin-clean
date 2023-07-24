import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Kirim request login ke API
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Jika login berhasil, ambil data admin dari response dan simpan ke session storage
        const data = await response.json();
        sessionStorage.setItem("admin", JSON.stringify(data));

        // Redirect ke halaman dashboard
        router.push("/dashboard");
      } else {
        // Jika login gagal, ambil pesan error dari response dan tampilkan ke user
        const { message } = await response.json();
        setError(message);
      }
    } catch (err) {
      // Jika terjadi error saat membuat request ke API, tampilkan pesan error ke user
      setError(err.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-5">Masuk Admin Jivin Clean</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
