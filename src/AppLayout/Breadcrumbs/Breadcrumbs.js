import { Link } from 'react-router-dom';
import { useBreadcrumbs } from 'src/router/router';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="Breadcrumbs">
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

export default Breadcrumbs;
