import { useTheme } from "next-themes";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    revenue: 10400,
    subscription: 240
  },
  {
    revenue: 14405,
    subscription: 300
  },
  {
    revenue: 9400,
    subscription: 200
  },
  {
    revenue: 8200,
    subscription: 278
  },
  {
    revenue: 7000,
    subscription: 189
  },
  {
    revenue: 9600,
    subscription: 239
  },
  {
    revenue: 11244,
    subscription: 278
  },
  {
    revenue: 26475,
    subscription: 189
  }
];

export const MockChart = () => {
  const { theme: mode } = useTheme();

  return (
    <div className="w-full h-[200px]">
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
