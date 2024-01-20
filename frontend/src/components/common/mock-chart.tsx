import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    revenue: 10400,
    projectedRevenue: 10000
  },
  {
    revenue: 14405,
    projectedRevenue: 16000
  },
  {
    revenue: 9400,
    projectedRevenue: 9000
  },
  {
    revenue: 8200,
    projectedRevenue: 8000
  },
  {
    revenue: 7000,
    projectedRevenue: 7000
  },
  {
    revenue: 9600,
    projectedRevenue: 12000
  },
  {
    revenue: 11244,
    projectedRevenue: 14000
  },
  {
    revenue: 26475,
    projectedRevenue: 25000
  }
];

export const MockChart = ({ className }: { className?: string }) => {
  const { theme: mode } = useTheme();

  return (
    <div className={cn("w-full h-[200px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0
          }}
        >
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="projectedRevenue"
            activeDot={{
              r: 0,
              style: { fill: "var(--theme-primary)", opacity: 0 }
            }}
            style={
              {
                stroke: "var(--theme-primary)",
                opacity: 0.5,
                "--theme-primary": `hsl(var(--destructive))`
              } as React.CSSProperties
            }
          />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="revenue"
            activeDot={{
              r: 6,
              style: { fill: "var(--theme-primary)", opacity: 0.25 }
            }}
            style={
              {
                stroke: "var(--theme-primary)",
                "--theme-primary": `hsl(var(--primary))`
              } as React.CSSProperties
            }
          />
          <CartesianGrid strokeDasharray="10 10" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
