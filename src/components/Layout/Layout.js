const { default: NavBar } = require("../Navbar/Navbar");

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
