import { useMatches, Link } from 'react-router-dom';
import { isFunction } from 'lodash';
import { scope } from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match) => {
      const breadcrumb = isFunction(match.handle.breadcrumb)
        ? match.handle.breadcrumb(match)
        : match.handle.breadcrumb;

      return { match, breadcrumb };
    });

  return (
    <div className={scope}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => {
        return (
          <span key={match.pathname}>
            {index !== 0 && <span className="separator">›</span>}

            {index < breadcrumbs.length - 1 && (
              <Link to={match.pathname}>{breadcrumb}</Link>
            )}

            {index === breadcrumbs.length - 1 && (
              <span className="current">{breadcrumb}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
