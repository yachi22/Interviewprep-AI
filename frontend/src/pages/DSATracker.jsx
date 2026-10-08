import { useEffect, useState } from "react";
import {
  getDSATopics,
  updateDSAProgress,
  resetDSAProgress,
} from "../api/dsaApi";

export default function DSATracker() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTopics() {
    try {
      setLoading(true);
      setError("");

      const response = await getDSATopics();

      setTopics(response.data.topics || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to fetch DSA topics."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTopics();
  }, []);

  async function toggleCompleted(topic) {
    try {
      setError("");

      const completed = !Boolean(topic.completed);

      await updateDSAProgress(
        topic.id,
        completed,
        Number(topic.revision_count) || 0
      );

      setTopics((current) =>
        current.map((item) =>
          item.id === topic.id
            ? {
                ...item,
                completed: completed ? 1 : 0,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to update progress."
      );
    }
  }

  async function updateRevisionCount(topic, value) {
    try {
      const revisionCount = Math.max(
        0,
        Number(value) || 0
      );

      setError("");

      await updateDSAProgress(
        topic.id,
        Boolean(topic.completed),
        revisionCount
      );

      setTopics((current) =>
        current.map((item) =>
          item.id === topic.id
            ? {
                ...item,
                revision_count: revisionCount,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to update revision count."
      );
    }
  }

  async function handleReset(topic) {
    try {
      setError("");

      await resetDSAProgress(topic.id);

      setTopics((current) =>
        current.map((item) =>
          item.id === topic.id
            ? {
                ...item,
                completed: 0,
                revision_count: 0,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
          "Failed to reset progress."
      );
    }
  }

  const completedTopics = topics.filter(
    (topic) => Boolean(topic.completed)
  ).length;

  const overallProgress =
    topics.length > 0
      ? Math.round(
          (completedTopics / topics.length) * 100
        )
      : 0;

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-slate-500">
          Loading DSA tracker...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          📚 DSA Tracker
        </h1>

        <p className="text-slate-500 mt-2">
          Track your DSA preparation topic by topic.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Overall Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {completedTopics} of {topics.length} topics completed
            </p>
          </div>

          <span className="text-2xl font-bold text-indigo-600">
            {overallProgress}%
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </div>

      {/* Topics */}
      {topics.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <div className="text-4xl mb-3">
            📚
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            No DSA topics available
          </h2>

          <p className="text-slate-500 mt-2">
            Add topics to your database to start tracking.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => {
            const completed = Boolean(
              topic.completed
            );

            return (
              <div
                key={topic.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {topic.name}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      DSA topic preparation
                    </p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      completed
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {completed
                      ? "Completed"
                      : "Not Completed"}
                  </span>
                </div>

                {/* Completion */}
                <div className="mt-6">
                  <button
                    onClick={() =>
                      toggleCompleted(topic)
                    }
                    className={`w-full py-3 rounded-lg font-medium transition ${
                      completed
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {completed
                      ? "✓ Marked as Completed"
                      : "Mark as Completed"}
                  </button>
                </div>

                {/* Revision Count */}
                <div className="mt-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Revision Count
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      Number(
                        topic.revision_count
                      ) || 0
                    }
                    onChange={(e) =>
                      updateRevisionCount(
                        topic,
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Number of times you have revised this topic.
                  </p>
                </div>

                {/* Reset */}
                <button
                  onClick={() =>
                    handleReset(topic)
                  }
                  className="mt-5 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Reset Progress
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
