'use client';

import React, { useState } from 'react';
import StatsCard from './StatCard';
import { Button } from '@/components/ui/button';
import { MesssageCard } from './MessageCard';
import { GridColDef } from '@mui/x-data-grid';

import { GoDotFill } from 'react-icons/go';
import MuiTableComponent from './TableCoponent';
import { AreaLineChart } from './AreaChart';
import {
  DashboardAreaChartData,
  DashboardMessages,
  DashboardStats,
  DashboardTableRows
} from '../../config';
import Link from 'next/link';

interface DashboardProps {
  isSidebarExpanded: boolean;
}

export default function Dashboard({ isSidebarExpanded }: DashboardProps) {
  const [dataLenght, setDataLength] = useState(3);
  const [allMessages, setAllMessages] = useState(false);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Track ID',
      flex: 0.5
    },
    {
      field: 'name',
      headerName: 'Title',
      flex: 1
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.5
    },
    { field: 'price', headerName: 'Price', flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      renderCell: ({ value }) => {
        return (
          <span
            className={` flex gap-1  font-medium text-sm
          ${
            value === 'Published'
              ? ' text-[#7065F0]'
              : value === 'Pending'
                ? ' text-[#FFA500]'
                : 'text-[#DC1313]'
          }`}
          >
            <GoDotFill size={18} /> {value}
          </span>
        );
      }
    },

    { field: 'inquiry', headerName: 'Inquiries', flex: 0.7 }
  ];

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DashboardStats?.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between   gap-10">
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-2xl font-[500px]">Revenue Analytics</h3>
          {/* chart */}
          <AreaLineChart
            data={DashboardAreaChartData}
            dataKey="value"
            color="#7065F0"
            xKey="name"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl">Messages</h3>{' '}
            <Button
              onClick={() => setAllMessages((prev) => !prev)}
              className="bg-transparent border-none shadow-none text-[20px] text-[#7065F0]"
            >
              {allMessages ? 'view less' : 'view all'}
            </Button>
          </div>

          {DashboardMessages?.map((message, index) =>
            allMessages ? (
              <Link href={`/admin/messages`} key={index}>
                <MesssageCard
                  senderName={message.senderName}
                  senderPhoto={message.senderPhoto}
                  content={message.content}
                  timeStamp={message.timeStamp}
                />
              </Link>
            ) : (
              index < 2 && (
                <Link href={`/admin/messages`} key={index}>
                  <MesssageCard
                    senderName={message.senderName}
                    senderPhoto={message.senderPhoto}
                    content={message.content}
                    timeStamp={message.timeStamp}
                  />
                </Link>
              )
            )
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 bg-white ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex justify-between p-5 items-center">
          <h3 className="text-2xl">Properties</h3>{' '}
          <Button
            onClick={() => setDataLength(10)}
            className="bg-transparent border-none shadow-none text-[20px] text-[#7065F0]"
          >
            view all
          </Button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={DashboardTableRows()}
            columns={columns}
            pageSize={dataLenght}
            paginationActive={true}
            showCheckbox={false}
          />
        </div>
      </div>
    </div>
  );
}
