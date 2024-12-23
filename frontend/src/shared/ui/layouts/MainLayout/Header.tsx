export const Header = () => {
  return (
    <header className="sticky top-0 flex min-h-[60px] w-full items-center gap-2 bg-header shadow">
      <div className="container mx-auto max-w-[1200px] text-text-primary">
        <ThemeToggler />
      </div>
    </header>
  );
};

const ThemeToggler = () => {
  const toggleTheme = () => document.documentElement.classList.toggle('dark');

  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
