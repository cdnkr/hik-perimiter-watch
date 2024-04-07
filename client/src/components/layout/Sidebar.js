import H6 from "@material-tailwind/react/Heading6";
import Icon from "@material-tailwind/react/Icon";
import { cameraIndexes } from "config";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <>
    <div
      style={{
        background: "#1e1f26"
      }}
      className={`h-screen fixed top-0 md:left-0 -left-64 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
    >
      <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-center w-full inline-block"
        >
          <H6 color="white">Perimeter Watch</H6>
        </a>
        <div className="flex flex-col">
          <hr className="my-4 min-w-full" />

          <ul className="flex-col min-w-full flex list-none">
            <li className="rounded-lg mb-4">
              <NavLink
                to="/"
                exact
                className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                activeClassName="bg-gradient-to-tr text-white shadow-md"
              >
                <Icon name="dashboard" size="2xl" />
                Grid
              </NavLink>
            </li>
            {cameraIndexes.map((cameraIndex) => (
              <li key={cameraIndex} className="rounded-lg mb-2">
                <NavLink
                  to={`/${cameraIndex}`}
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr text-white shadow-md"
                >
                  <Icon name="camera_alt" size="2xl" />
                  Camera {cameraIndex}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default Sidebar;