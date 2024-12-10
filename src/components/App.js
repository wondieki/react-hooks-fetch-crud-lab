import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const baseUrl = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch the questions using useEffect
  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch(baseUrl);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getQuestions();
  }, []);

  // Function to add new questions
  function handleNewQuestions(newQuiz) {
    setQuestions((prevQuiz) => [...prevQuiz, newQuiz]);
  }

  // Function to remove the deleted questions
  function deleteQuestions(deletedQuestion) {
    const updatedQuestions = questions.filter(
      (existingQuestion) => existingQuestion.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={handleNewQuestions} />
      ) : (
        <QuestionList questions={questions} onDelete={deleteQuestions} />
      )}
    </main>
  );
}

export default App;
