import { Link } from "react-router-dom";
import Profile from "./profile/Profile";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

function Home() {
  const { isAuthenticated } = useDynamicContext();
  const [hasProfile, setHasProfile] = useState(
    !!window.localStorage.getItem("userProfile")
  );

  return (
    <>
      {/* <Identity /> */}
      <div className="main-container">
        <h1 className="text-2xl my-6">
          Hi. <br />
          Thanks for contributing to womxn’s OCD health. Let’s get started.{" "}
        </h1>
        {!isAuthenticated ? (
          <>
            <Profile
              onUpdate={() => {
                setHasProfile(true);
              }}
            />
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
            <Profile
              onUpdate={() => {
                setHasProfile(true);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
