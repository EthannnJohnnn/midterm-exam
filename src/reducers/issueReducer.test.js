import test from "node:test";
import assert from "node:assert/strict";

import { issueReducer } from "./issueReducer.js";

test("ADD_ISSUE adds an issue and increments nextId", () => {
  const state = Object.freeze({
    issues: Object.freeze([]),
    filter: "all",
    nextId: 1,
  });

  const result = issueReducer(state, {
    type: "ADD_ISSUE",
    payload: { title: "  Fix login  " },
  });

  assert.deepEqual(result, {
    issues: [{ id: 1, title: "Fix login", done: false }],
    filter: "all",
    nextId: 2,
  });

  assert.equal(state.issues.length, 0);
  assert.notStrictEqual(result, state);

  // Unknown actions preserve the existing state.
  assert.strictEqual(issueReducer(state, { type: "UNKNOWN" }), state);
});

test("TOGGLE_ISSUE changes only the matching issue immutably", () => {
  const firstIssue = Object.freeze({
    id: 1,
    title: "Fix login",
    done: false,
  });

  const secondIssue = Object.freeze({
    id: 2,
    title: "Fix search",
    done: false,
  });

  const state = Object.freeze({
    issues: Object.freeze([firstIssue, secondIssue]),
    filter: "all",
    nextId: 3,
  });

  const result = issueReducer(state, {
    type: "TOGGLE_ISSUE",
    payload: { id: 1 },
  });

  assert.equal(result.issues[0].done, true);
  assert.equal(firstIssue.done, false);
  assert.notStrictEqual(result.issues[0], firstIssue);
  assert.strictEqual(result.issues[1], secondIssue);
});

test("CLEAR_DONE removes completed issues and preserves open issues", () => {
  const openIssue = Object.freeze({
    id: 1,
    title: "Open issue",
    done: false,
  });

  const doneIssue = Object.freeze({
    id: 2,
    title: "Completed issue",
    done: true,
  });

  const state = Object.freeze({
    issues: Object.freeze([openIssue, doneIssue]),
    filter: "all",
    nextId: 3,
  });

  const result = issueReducer(state, {
    type: "CLEAR_DONE",
  });

  assert.deepEqual(result.issues, [openIssue]);
  assert.equal(result.nextId, 3);
  assert.equal(state.issues.length, 2);
});