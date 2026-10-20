import { useState } from "react";

export default function Exam1() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  const targetReached = count >= target;
  const remaining = Math.max(0, target - count);
  const progress = Math.min(100, Math.round((count / target) * 100));

  const status =
    count === 0
      ? "Not started"
      : targetReached
        ? "Target reached"
        : "In progress";

  function increment() {
    setCount((previousCount) => Math.min(previousCount + 1, target));
  }

  function addTwo() {
    setCount((previousCount) => Math.min(previousCount + 1, target));
    setCount((previousCount) => Math.min(previousCount + 1, target));
  }

  function changeTarget(event) {
    const value = Number(event.target.value);

    if (Number.isSafeInteger(value) && value >= 1) {
      setTarget(value);

      // Keep count within the target if the target is lowered.
      setCount((previousCount) => Math.min(previousCount, value));
    }
  }

  return (
    <section className="task-counter">
      <p className="counter-description">
        Set your study goal and track each completed task.
      </p>

      <div className="counter-settings">
        <div>
          <label htmlFor="target">Task target</label>
          <p id="target-help" className="field-help">
            How many tasks do you want to finish?
          </p>
        </div>

        <input
          id="target"
          type="number"
          min="1"
          step="1"
          value={target}
          onChange={changeTarget}
          aria-describedby="target-help"
        />
      </div>

      <div className={`counter-summary ${targetReached ? "is-complete" : ""}`}>
        <span className="counter-eyebrow">COMPLETED TASKS</span>

        <div className="counter-total">
          <span>{count}</span>
          <span className="counter-target">/ {target}</span>
        </div>

        <span
          className={`status-badge ${
            targetReached
              ? "status-complete"
              : count > 0
                ? "status-progress"
                : "status-idle"
          }`}
          role="status"
        >
          {status}
        </span>

        <div className="progress-heading">
          <span>Session progress</span>
          <strong>{progress}%</strong>
        </div>

        <progress
          className="task-progress"
          value={count}
          max={target}
          aria-label="Completed tasks"
        />

        <p className="remaining-text">
          {targetReached
            ? "Goal complete. Nice work!"
            : `${remaining} task${remaining === 1 ? "" : "s"} left to reach your goal.`}
        </p>
      </div>

      <div className="counter-actions">
        <button
          className="primary-button"
          disabled={targetReached}
          onClick={increment}
        >
          +1 Increment
        </button>

        <button
          className="secondary-button"
          disabled={targetReached}
          onClick={addTwo}
        >
          +2 Plus two
        </button>

        <button
          disabled={count === 0}
          onClick={() =>
            setCount((previousCount) => Math.max(0, previousCount - 1))
          }
        >
          −1 Decrement
        </button>

        <button
          className="reset-button"
          disabled={count === 0}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>

      <p className="counter-footnote">
        Progress stops at your target. Reset starts a new session.
      </p>
    </section>
  );
}