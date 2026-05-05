export default function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('ss-theme');
        var prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored || (prefersDark ? 'skillsphereDark' : 'skillsphere');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
