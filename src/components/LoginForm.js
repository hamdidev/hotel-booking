import React from "react";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="your email">
          Email
        </label>

        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="your password">
          Password
        </label>

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={!email || !password}
        className="btn btn-primary"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
