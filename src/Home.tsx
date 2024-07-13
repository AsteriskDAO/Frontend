import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import Profile from "./profile/Profile";

function Home() {
  const { isConnected } = useAccount();
  const hasProfile = window.localStorage.getItem("userProfile");

  return (
    <>
      {/* <Identity /> */}
      <div className="main-container">
        <h1 className="text-2xl my-6">
          Hi. <br />
          Thanks for contributing to womxn’s OCD health. Let’s get started.{" "}
        </h1>
        {!isConnected ? (
          <>
            <Profile />
          </>
        ) : hasProfile ? (
          <>
            <div className="flex justify-between">
              <Link to="/profile" className="btn btn-primary-color">
                Update profile
              </Link>
              <Link to="/check-in" className="btn btn-primary-color">
                Daily check in
              </Link>
            </div>
          </>
        ) : (
          <>
            <Profile />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
