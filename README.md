# React Hooks Practical Exam System

One Vite React application containing six separate exam sections.

## Run

npm install
npm run dev

On Windows PowerShell, npm.cmd can be used instead of npm.

## Completed Requirements

1. Smart Task Counter
   - Count and target use useState.
   - Increment, decrement, reset, and queued plus-two updates.
   - Count never becomes negative.
   - Status is derived from count and target.
   - Increment and plus two are disabled when count >= target.
   - Plus two uses two queued functional updates, capped at the target.
   - With count 4 and target 5, Plus two produces 5.
   - Lowering the target below the current count also caps the count.

2. Live Search and Timer
   - Uses the supplied four local users.
   - Search runs after a 400 ms delay.
   - Cleanup cancels outdated searches.
   - A cleaned-up interval increments elapsed seconds.
   - The document title displays the visible result count.

3. Accessible Form Toolkit
   - Controlled name, email, and password inputs.
   - Input refs and readable validation messages.
   - First invalid field receives focus in name/email/password order.
   - A ref stores the latest successful email.
   - The next successful submission displays the previous email.
   - Ref access occurs in handlers, not during rendering.

4. Application Preferences
   - One shared context and provider.
   - Dashboard > Toolbar > PreferencesPanel.
   - Dashboard also contains ArticlePreview.
   - Light/dark theme and 14/16/18 px font options.
   - usePreferences throws outside the provider.
   - No preference prop drilling.

5. Product Explorer
   - 600 generated records.
   - Search, category filtering, and price sorting.
   - useMemo caches the filtered and sorted list.
   - useCallback caches selection behavior with project dependency.
   - ProductList uses React.memo.
   - Unrelated counter demonstrates skipped child renders.
   - Analytics runs in useEffect.

6. Issue Tracker
   - Pure immutable reducer with all five required actions.
   - Unknown actions return the existing state.
   - usePersistentReducer loads and saves localStorage state.
   - All/Open/Done filters and accurate counts.
   - Three reducer tests cover add, toggle, and clear done.

## Debugging Repairs

- Two setCount(count + 1) calls capture the same count.
  Two functional updates each receive the latest queued value.

- Search depends on query, not the results state it updates.
  This prevents a repeated effect loop.

- The interval uses a functional seconds update.
  This prevents a stale closure from keeping the timer at one.

- clearTimeout cancels an outdated search.
  clearInterval stops the timer during unmount.

- Visible click counts require useState rather than useRef.
  Ref mutation does not schedule a render.

- PreferencesProvider wraps all preference consumers.
  Provider and consumers use the same exported context object.
  Intermediate components do not pass preference props.

- The product memo includes query, category, and sortOrder.
  The selection callback includes the project it reads.
  Analytics belongs in useEffect, not useMemo.

- Reducer updates use new arrays and changed issue objects.
  Dispatch data is consistently nested inside payload.
  The reducer default branch returns state.

## When Memoization Is Unnecessary

A cheap calculation such as count + 1 does not need useMemo.
A callback passed only to a normal button usually does not need
useCallback unless another dependency or optimization requires it.

## Test Steps

1. Exam 1: Begin at count 0 and target 5. Decrement stays at 0.
   Reach 4, click plus two, and verify 6 and disabled add buttons.
   Reset returns to 0 and enables the add buttons.

2. Exam 2: Search Developer and expect Ana and Dan.
   Type quickly and verify the final query determines results.
   Confirm the browser title count and one-second timer.
   Switch exams and return; verify the timer restarts normally.

3. Exam 3: Submit empty fields and check all errors and name focus.
   Fix name and check email focus. Fix email and check password focus.
   Submit two different valid emails and verify the previous email.

4. Exam 4: Toggle theme and try all three font sizes.
   Verify Dashboard and ArticlePreview update together.

5. Exam 5: Test search, category, sorting, and product selection.
   Change project, select a product, and verify the new project.
   Open DevTools Console and clear existing messages.
   Click the unrelated counter several times.
   ProductList render logs should not increase.
   Changing actual product inputs should produce new render logs.

6. Exam 6: Add, toggle, delete, filter, and clear issues.
   Confirm counts stay correct.
   Reload the page, reopen Exam 6, and verify saved state.

Run reducer tests:
npm test

Check production build:
npm run build

## Known Limitations

- Registration is a local demonstration with no backend.
- Email validation checks basic structure, not mailbox existence.
- Search uses local data and a simulated delay.
- Only Exam 6 persists across browser reloads.
- Exams 1, 2, 3, and 5 reset when switching away.
- Exam 4 preferences survive exam navigation but not page reloads.
- Persistence assumes saved JSON has the expected state structure.
- If localStorage is unavailable, the tracker still works in memory.
- Strict Mode may duplicate initial development logs.
- Product analytics is demonstrated with console output.

## Demonstration Bug

Reproduce the broken plus-two handler from the exam:

setCount(count + 1);
setCount(count + 1);

Both calls use the same captured count, producing only one increment.

Repair it with:

setCount(previous => previous + 1);
setCount(previous => previous + 1);

Each updater receives the previous queued result, producing +2.