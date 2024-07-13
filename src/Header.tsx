import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <div className="h-[90px] z-10 fixed left-0 top-0 w-full bg-secondary flex justify-between items-center px-4">
      <div>
        <img src="/AsteriskDAO-FullLogo.png" width={200} />
      </div>
      <DynamicWidget />
    </div>
  );
}
