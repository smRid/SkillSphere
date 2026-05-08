export default function ThemeScript() {
  const code = `
    (function() {
      try {
        var stored = localStorage.getItem('ss-theme');
        var theme = stored || 'skillsphere';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
