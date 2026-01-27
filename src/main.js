function getCanvas() {
  const canvas = document.getElementById("game");
  if (!canvas) {
    throw new Error("Canvas introuvable");
  }
  return canvas;
}

function getContext() {
  // const ctx =
}
