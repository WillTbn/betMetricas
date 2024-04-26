export default function useCaseMetricas() {
  const serializeString = (e) => {
    return e.replace(/\s+/g, "").toUpperCase();
  };

  return { serializeString };
}
