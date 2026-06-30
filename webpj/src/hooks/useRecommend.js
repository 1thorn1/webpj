import { useState } from "react";
import { fetchRecommendation } from "../api/recommend";

export function useRecommend() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function recommend(params) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecommendation(params);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, recommend };
}
