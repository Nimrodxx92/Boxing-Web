import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <button onClick={() => loginWithRedirect()} className="login">
        Login
      </button>
    </div>
  );
};

export default LoginButton;
