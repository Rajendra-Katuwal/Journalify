const SystemThemeFinder = () => {
  // Check if the browser supports the matchMedia API
  if (window.matchMedia) {
    // Check if the user prefers a dark theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  // Default to light theme if matchMedia is not supported
  return 'light';
};

export const getSystemTheme = SystemThemeFinder;
export default SystemThemeFinder;