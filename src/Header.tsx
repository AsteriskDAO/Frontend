import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-[90px] z-10 fixed left-0 top-0 w-full bg-neutral-content flex justify-between items-center px-4">
      <div>
        <Link to="/">
          <img src="/AsteriskDAO-FullLogo.png" width={200} />
        </Link>
      </div>
      <DynamicWidget />
    </div>
  );
}
