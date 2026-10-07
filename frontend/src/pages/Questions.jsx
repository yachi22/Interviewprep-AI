import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyQuestions } from "../api/companyApi";
import { addBookmark } from "../api/bookmarkApi";
import { addSolvedQuestion } from "../api/solvedApi";

export default function Questions() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await getCompanyQuestions(id);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    }

    loadQuestions();
  }, [id]);

  async function handleBookmark(questionId) {
    try {
      await addBookmark(questionId);
      alert("Question bookmarked successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to bookmark.");
    }
  }

  async function handleSolved(questionId) {
    try {
      await addSolvedQuestion(questionId);
      alert("Question marked as solved!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to mark as solved.");
    }
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title?.toLowerCase().includes(search.toLowerCase()) ||
      question.question?.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" ||
      question.difficulty?.toLowerCase() === difficulty.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Interview Questions
      </h1>

      <div className="bg-white shadow rounded-xl p-5 border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interview questions..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Showing {filteredQuestions.length} of {questions.length} questions
        </p>
      </div>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6 border">
          <p className="text-gray-600">
            No questions match your search or difficulty filter.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white shadow rounded-xl p-6 border"
            >
              <h2 className="text-xl font-semibold">
                {question.title}
              </h2>

              <p className="mt-3">
                <strong>Question:</strong> {question.question}
              </p>

              <p className="mt-3">
                <strong>Difficulty:</strong> {question.difficulty}
              </p>

              <p className="mt-3 text-green-700">
                <strong>Answer:</strong> {question.answer}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleBookmark(question.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Bookmark
                </button>

                <button
                  onClick={() => handleSolved(question.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Mark as Solved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
