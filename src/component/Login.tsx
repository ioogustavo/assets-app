import { useState } from "react";
import { loginUser } from "../actions/callsApi"; // Ajusta la ruta según tu proyecto

interface LoginProps {
   onLogin: (token: string) => void;
}

interface LoginDto {
   username: string;
   password: string;
}

interface AuthResponse {
   access_token: string;
}

export const Login = ({ onLogin }: LoginProps) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
         const payload: LoginDto = { username, password };
         const res: AuthResponse = await loginUser(payload);
         localStorage.setItem("token", res.access_token);
         onLogin(res.access_token);
      } catch (err: any) {
         setError(err.message || "Usuario o contraseña incorrectos");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="asset-app login-container">
         <div className="modal-overlay">
            <div className="modal">
               <h2>Login</h2>
               <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label>Usuario</label>
                     <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                     />
                  </div>
                  <div className="form-group">
                     <label>Contraseña</label>
                     <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                     />
                  </div>
                  {error && (
                     <p className="error" style={{ color: "#ef4444" }}>
                        {error}
                     </p>
                  )}
                  <div className="modal-buttons">
                     <button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};
