import React from "react";

const baseUrl = "http://localhost:4000/questions";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleQuestionDelete() {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(question)); // Trigger onDelete after successful deletion
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleQuestionDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
