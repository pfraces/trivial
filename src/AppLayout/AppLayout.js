import Header from './Header/Header';
import './AppLayout.css';

function AppLayout({ children }) {
  return (
    <div className="AppLayout">
      <Header />
      <div className="body">{children}</div>
    </div>
  );
}

export default AppLayout;
