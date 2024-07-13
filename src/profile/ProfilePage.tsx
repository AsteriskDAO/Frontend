import Profile from "./Profile";
import { useAccount } from "wagmi";

export default () => {
  const { isConnected } = useAccount();
  return (
    <>
      <div className="main-container pb-6">
        <h1 className="text-2xl font-bold my-6">
          Welcome,{" "}
          {isConnected ? "please update your profile" : "create a new profile"}
        </h1>
        <Profile />
      </div>
    </>
  );
};
