import { useState } from "react";

import Exam1 from "./exams/Exam1.jsx";
import Exam2 from "./exams/Exam2.jsx";
import Exam3 from "./exams/Exam3.jsx";
import Exam4 from "./exams/Exam4.jsx";
import Exam5 from "./exams/Exam5.jsx";
import Exam6 from "./exams/Exam6.jsx";

import PreferencesProvider from "./context/PreferencesProvider.jsx";

const exams = [
  { id: 1, title: "Smart Task Counter", component: Exam1 },
  { id: 2, title: "Live Search and Timer", component: Exam2 },
  { id: 3, title: "Accessible Form Toolkit", component: Exam3 },
  { id: 4, title: "Application Preferences", component: Exam4 },
  { id: 5, title: "Product Explorer", component: Exam5 },
  { id: 6, title: "Issue Tracker", component: Exam6 },
];

export default function App() {
  const [activeExam, setActiveExam] = useState(1);

  const currentExam = exams.find((exam) => exam.id === activeExam);
  const ActiveExam = currentExam.component;

  return (
    <PreferencesProvider>
      <div className="app">
        <header>
          <h1>React Hooks Practical Exam</h1>
          <p>One application with six separate exam activities.</p>
        </header>

        <nav className="exam-nav" aria-label="Exam navigation">
          {exams.map((exam) => (
            <button
              key={exam.id}
              type="button"
              className={activeExam === exam.id ? "active" : ""}
              aria-pressed={activeExam === exam.id}
              onClick={() => setActiveExam(exam.id)}
            >
              Exam {exam.id}
            </button>
          ))}
        </nav>

        <main className="card">
          <h2>
            Exam {currentExam.id}: {currentExam.title}
          </h2>

          <ActiveExam />
        </main>
      </div>
    </PreferencesProvider>
  );
}