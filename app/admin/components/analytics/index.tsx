'use client';

import React from 'react';

import {
  AnalyticsLineChartData,
  AnalyticsPieChartData,
  DashboardAreaChartData,
  DashboardStats
} from '../../config';
import StatsCard from '../dashboard/StatCard';
import { AreaLineChart } from '../dashboard/AreaChart';
import TwoArcPieChart from './PieChart';
import ReusableLineChart from './LineChart';

export default function Analytics() {
  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {DashboardStats?.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-y-5  gap-x-10">
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Revenue Analytics</h3>
          {/* chart */}
          <AreaLineChart
            data={DashboardAreaChartData}
            dataKey="value"
            color="#7065F0"
            xKey="name"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Property Listing Analytics</h3>{' '}
          {/*line chart here */}
          <ReusableLineChart
            data={AnalyticsLineChartData}
            dataKey="listing"
            type="linear"
            xKey="month"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between  gap-x-10 gap-y-5">
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl ">Property View</h3>
          {/*line chart */}
          <ReusableLineChart
            data={AnalyticsLineChartData}
            dataKey="views"
            type="linear"
            xKey="month"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Property Types</h3>{' '}
          {/*pie chart */}
          <TwoArcPieChart data={AnalyticsPieChartData} />
        </div>
      </div>
    </div>
  );
}
