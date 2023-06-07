import ConnectButton from './ConnectButton';
import logo from "../assets/logo.png";

function Header() {
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl ml-2">
            <img src={logo} className="w-10 h-10 mr-2 p-0 opacity-80" />
            EtherEmpires
          </a>
        </div>
        <div className="navbar-end">
          <ConnectButton />
        </div>
      </div>
    </>
  );
}

export default Header;