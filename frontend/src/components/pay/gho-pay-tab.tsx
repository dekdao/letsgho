import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function GhoPayTab() {
  const mockData = {
    balance: 500.13
  };
  return (
    <div className="flex flex-col gap-4 items-center w-[100%]">
      <div className="flex  w-[100%] justify-start text-md">Your $GHO Balances</div>

      <RadioGroup defaultValue="option-one" className="flex w-[100%] items-center space-x-2">
        <div className="flex w-[100%] items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <div className="flex w-[100%] justify-between items-center">
            <h1 className="text-xl font-heading">{mockData.balance} $GHO</h1>
            <h1 className="text-lg font-heading">Sepolia</h1>
          </div>
        </div>
      </RadioGroup>

      <Button className="w-[100%] bg-green-400">Pay Now</Button>
    </div>
  );
}
