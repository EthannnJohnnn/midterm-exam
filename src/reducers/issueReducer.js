export const initialIssueState = {
  issues: [],
  filter: "all",
  nextId: 1,
};

export function issueReducer(state, action) {
  switch (action.type) {
    case "ADD_ISSUE": {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      const newIssue = {
        id: state.nextId,
        title,
        done: false,
      };

      return {
        ...state,
        issues: [...state.issues, newIssue],
        nextId: state.nextId + 1,
      };
    }

    case "TOGGLE_ISSUE":
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id
            ? { ...issue, done: !issue.done }
            : issue
        ),
      };

    case "DELETE_ISSUE":
      return {
        ...state,
        issues: state.issues.filter(
          (issue) => issue.id !== action.payload.id
        ),
      };

    case "SET_FILTER": {
      const filter = action.payload.filter;

      if (!["all", "open", "done"].includes(filter)) {
        return state;
      }

      return {
        ...state,
        filter,
      };
    }

    case "CLEAR_DONE":
      return {
        ...state,
        issues: state.issues.filter((issue) => !issue.done),
      };

    default:
      return state;
  }
}