import { useAccount } from "wagmi";
import Header from "./Header";
import Identity from "./Identity";
import { Link, Outlet } from "react-router-dom";

function App() {
  const { address, isConnected, chain } = useAccount();

  console.log("address", address, "i", isConnected);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
