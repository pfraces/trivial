import Header from './Header/Header';
import './AppLayout.css';

function AppLayout({ children }) {
  return (
    <div className="AppLayout">
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;
