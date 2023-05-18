import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="Admin">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Admin</h1>
          </div>

          <ul>
            <li>
              <Link to="questions">Questions</Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

export default Admin;
