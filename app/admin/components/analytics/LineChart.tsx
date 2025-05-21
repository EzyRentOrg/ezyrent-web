import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type LineChartProps = {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural';
  data: Record<string, string | number>[];
  dataKey: string; // e.g. ['sales', 'revenue']
  xKey: string; // e.g. 'month'
  color?: string; // Optional colors for each line
  height?: number;
};

const ReusableLineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xKey,
  type,
  color = '#4585B5',
  height = 300
}) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type={type || 'monotone'}
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableLineChart;
