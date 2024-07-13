import { useAccount } from "wagmi";
import Header from "./Header";
import Identity from "./Identity";
import { Link } from "react-router-dom";
import Profile from "./profile/Profile";

function Home() {
  const { address, isConnected, chain } = useAccount();

  console.log("address", address, "i", isConnected);
  return (
    <>
      {/* <Identity /> */}
      <div className="main-container">
        {!isConnected ? (
          <>
            <h1 className="text-3xl my-6">Welcome, create a new profile </h1>
            <Profile />
          </>
        ) : (
          <>
            <h1 className="text-3xl my-6">Welcome</h1>
            <div className="flex justify-between">
              <Link to="/profile" className="btn">
                Update profile
              </Link>
              <Link to="/check-in" className="btn">
                Daily check in
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;