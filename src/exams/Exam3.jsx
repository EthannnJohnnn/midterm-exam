import { useRef, useState } from "react";

export default function Exam3() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState(null);

  // Visible data uses state so changes trigger a render.
  const [clicks, setClicks] = useState(0);

  // DOM refs for focusing invalid inputs.
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Remembers the last successful email without triggering a render.
  const lastSubmittedEmailRef = useRef("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    const email = form.email.trim();

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.password.length < 8) {
      nextErrors.password =
        "Password must contain at least 8 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmission(null);

      // Focus the first invalid field in the required order.
      if (nextErrors.name) {
        nameRef.current?.focus();
      } else if (nextErrors.email) {
        emailRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }

      return;
    }

    // Access refs inside the handler, never during rendering.
    const previousEmail = lastSubmittedEmailRef.current;
    lastSubmittedEmailRef.current = email;

    // Store a snapshot in state for display.
    setSubmission({
      email,
      previousEmail,
    });
  }

  return (
    <section>
      <p>
        Complete the form. If a field is invalid, submitting will
        move your cursor to the first field that needs attention.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="registration-name">Name</label>
        <input
          id="registration-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          required
          value={form.name}
          onChange={handleChange}
          ref={nameRef}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />

        {errors.name && (
          <p id="name-error" className="error">
            {errors.name}
          </p>
        )}

        <label htmlFor="registration-email">Email</label>
        <input
          id="registration-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={handleChange}
          ref={emailRef}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />

        {errors.email && (
          <p id="email-error" className="error">
            {errors.email}
          </p>
        )}

        <label htmlFor="registration-password">Password</label>
        <input
          id="registration-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          minLength={8}
          value={form.password}
          onChange={handleChange}
          ref={passwordRef}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "password-error" : undefined
          }
        />

        {errors.password && (
          <p id="password-error" className="error">
            {errors.password}
          </p>
        )}

        <button type="submit">Register</button>
      </form>

      <div aria-live="polite" aria-atomic="true">
        {submission && (
          <div className="notice">
            <p>
              <strong>Successfully submitted:</strong>{" "}
              {submission.email}
            </p>

            <p>
              <strong>Previous submitted email:</strong>{" "}
              {submission.previousEmail || "No previous submission"}
            </p>
          </div>
        )}
      </div>

      <div className="notice">
        <h3>Debugging demo: visible click counter</h3>

        <p>
          This counter uses state so the displayed number updates
          after each click.
        </p>

        <div className="actions">
          <button
            type="button"
            onClick={() => setClicks((previous) => previous + 1)}
          >
            Clicks: {clicks}
          </button>

          <button
            type="button"
            disabled={clicks === 0}
            onClick={() => setClicks(0)}
          >
            Reset clicks
          </button>
        </div>

        <p>
          Changing a ref does not trigger a render. Updating state
          schedules a render so the new count appears.
        </p>
      </div>
    </section>
  );
}