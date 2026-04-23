if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/dist/sw.js", {
    scope: "/",
    type: "module",
  });
}
