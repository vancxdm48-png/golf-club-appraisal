(async () => {
  const files = [
  "./app.001.js",
  "./app.002.js",
  "./app.003.js",
  "./app.004.js",
  "./app.005.js",
  "./app.006.js",
  "./app.007.js",
  "./app.008.js",
  "./app.009.js"
];
  try {
    const parts = await Promise.all(files.map(async (file) => {
      const response = await fetch(file);
      if (!response.ok) throw new Error("Failed to load " + file + ": " + response.status);
      return response.text();
    }));
    (0, eval)(parts.join("\n"));
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("afterbegin", "<div style=\"padding:16px;background:#fee2e2;color:#7f1d1d;font-weight:700;\">アプリの読み込みに失敗しました。ページを再読み込みしてください。</div>");
  }
})();
