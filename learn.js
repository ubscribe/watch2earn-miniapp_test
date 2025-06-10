document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("intro-video");

  video.addEventListener("ended", () => {
    window.location.href = "index.html";
  });
});
