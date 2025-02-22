import Link from 'next/link'
import { FaImages, FaRightFromBracket } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 h-20 px-4 rounded-xl shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-3xl"><FaImages size={48} /> SMTrack Media Server</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="text-lg font-bold">
          <div>Tonza007</div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a><FaRightFromBracket /> Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;