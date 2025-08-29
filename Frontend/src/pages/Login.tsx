import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store"
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction: any = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        const user = resultAction.payload; // Firebase user object

        if (user.email === "admin@gmail.com") {
          sessionStorage.setItem("isAdmin", "true");
          navigate("/admin");
        } else {
          sessionStorage.setItem("isAdmin", "false");
          navigate("/");
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 p-10">
      <div className="px-6 py-4">
        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Welcome to Admin Panel
        </h3>
        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login for Admin</p>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="w-full mt-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <p>Email: admin@gmail.com <br /> Password: admin123</p>
      </div>
    </div>
  );
};

export default Login;
