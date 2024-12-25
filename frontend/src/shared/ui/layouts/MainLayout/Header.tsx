import {Link} from 'react-router-dom';

import {ThemeToggler} from '@features/themeToggle';
import {TypedLink, Button} from '@shared/ui';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex min-h-[60px] w-full items-center gap-2 bg-header shadow">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between gap-2 text-text-primary">
        <TypedLink to="/">
          <h1 className="text-lg font-bold hover:scale-125">Movies</h1>
        </TypedLink>

        <div className="flex gap-2">
          <TypedLink to="/top-views">Top views</TypedLink>
          <TypedLink to="/theme-page">Theme page</TypedLink>
        </div>

        <div className="flex gap-2">
          <ThemeToggler />
          <Button asChild>
            <Link to="/auth">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
