import { useEffect, useState } from "react";

const USERS = [
  { id: 1, name: "Ana Cruz", role: "Developer" },
  { id: 2, name: "Ben Lim", role: "Designer" },
  { id: 3, name: "Cara Yu", role: "Tester" },
  { id: 4, name: "Dan Go", role: "Developer" },
];

export default function Exam2() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(USERS);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const searchText = query.trim().toLowerCase();

      const filteredUsers = USERS.filter((user) =>
        `${user.name} ${user.role}`.toLowerCase().includes(searchText)
      );

      setResults(filteredUsers);
      setLoading(false);
    }, 400);

    // Cancel the previous search when query changes or on unmount.
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    // Stop the timer when this exam unmounts.
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${results.length} users | Live Search`;

    return () => {
      document.title = previousTitle;
    };
  }, [results.length]);

  function handleSearch(event) {
    setQuery(event.target.value);
    setLoading(true);
  }

  return (
    <section>
      <p className="stat">Session time: {seconds} seconds</p>

      <label htmlFor="user-search">Search by name or role</label>
      <input
        id="user-search"
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Try Developer or Ana"
      />

      <p role="status">
        {loading ? "Searching..." : `${results.length} users found`}
      </p>

      <ul className="item-list" aria-busy={loading}>
        {results.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </li>
        ))}
      </ul>

      {!loading && results.length === 0 && <p>No matching users.</p>}
    </section>
  );
}