import { useState } from "react";
import usePersistentReducer from "../hooks/usePersistentReducer.js";
import {
  initialIssueState,
  issueReducer,
} from "../reducers/issueReducer.js";

export default function Exam6() {
  const [state, dispatch] = usePersistentReducer(
    issueReducer,
    initialIssueState,
    "midterm-issues-v1"
  );

  const [title, setTitle] = useState("");

  const doneCount = state.issues.filter((issue) => issue.done).length;
  const openCount = state.issues.length - doneCount;

  const visibleIssues = state.issues.filter((issue) => {
    if (state.filter === "open") {
      return !issue.done;
    }

    if (state.filter === "done") {
      return issue.done;
    }

    return true;
  });

  function handleAddIssue(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch({
      type: "ADD_ISSUE",
      payload: { title },
    });

    setTitle("");
  }

  return (
    <section>
      <form onSubmit={handleAddIssue}>
        <label htmlFor="issue-title">Issue title</label>
        <input
          id="issue-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Describe an issue"
        />

        <button type="submit" disabled={!title.trim()}>
          Add issue
        </button>
      </form>

      <p>
        All: {state.issues.length} | Open: {openCount} | Done: {doneCount}
      </p>

      <div className="actions" aria-label="Issue filters">
        {["all", "open", "done"].map((filter) => (
          <button
            key={filter}
            className={state.filter === filter ? "active" : ""}
            aria-pressed={state.filter === filter}
            onClick={() =>
              dispatch({
                type: "SET_FILTER",
                payload: { filter },
              })
            }
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}

        <button
          disabled={doneCount === 0}
          onClick={() => dispatch({ type: "CLEAR_DONE" })}
        >
          Clear done
        </button>
      </div>

      <ul className="item-list">
        {visibleIssues.map((issue) => (
          <li key={issue.id}>
            <label className="issue-label">
              <input
                type="checkbox"
                checked={issue.done}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_ISSUE",
                    payload: { id: issue.id },
                  })
                }
              />

              <span className={issue.done ? "completed" : ""}>
                {issue.title}
              </span>
            </label>

            <button
              onClick={() =>
                dispatch({
                  type: "DELETE_ISSUE",
                  payload: { id: issue.id },
                })
              }
              aria-label={`Delete ${issue.title}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {visibleIssues.length === 0 && <p>No issues in this view.</p>}
    </section>
  );
}