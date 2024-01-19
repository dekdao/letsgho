import { Button } from "../ui/button";
import { HealthFactor } from "./health-factor";

export function LetsGhoPayTab() {
  const mockData = {
    credit: 2521.67,
    healthFactor: 1.2
  };
  return (
    <div className="flex flex-col gap-4 items-center w-[100%]">
      <div className="flex  w-[100%] justify-start text-md">Your Let's GHO Credit</div>
      <h1 className="text-4xl font-heading">${mockData.credit}</h1>
      <div className="flex flex-col items-center">
        <div className="text-md">Credit Health Factor</div>
        <h1 className="text-xl text-green-400 font-heading">{mockData.healthFactor}</h1>
        <h1 className="text-2xl font-heading">🤑</h1>
      </div>
      <HealthFactor />

      <Button className="w-[100%] bg-green-400">Pay Now</Button>
    </div>
  );
}
