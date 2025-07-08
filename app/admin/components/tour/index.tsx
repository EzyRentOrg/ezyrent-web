'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { GoTrash } from 'react-icons/go';
import { TourTableRows } from '../../config';
import MuiTableComponent from '../dashboard/TableCoponent';
import { SendHorizontal, UserX } from 'lucide-react';
import { PiDownloadSimpleFill, PiSlidersHorizontalFill } from 'react-icons/pi';
import { useClickAway } from 'react-use';
import { BsThreeDots } from 'react-icons/bs';
import { Popper } from '@mui/material';
import { LuEye } from 'react-icons/lu';
import { UserStatsCard } from '../statCard';

interface TourMgtProps {
  isSidebarExpanded: boolean;
}

export default function TourMgt({ isSidebarExpanded }: TourMgtProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const [TourMetrics, setTourMetrics] = useState({
    totalTourReq: {
      title: 'Total Tour Requests',
      count: 0,
      percentageChange: 0
    },
    pendingTour: { title: 'Pending Tour', count: 0, percentageChange: 0 },
    assignedTour: { title: 'Free Users', count: 0, percentageChange: 0 }
  });
  const [tableData, setTableData] = useState<TourTableRow[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents bubbling
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const columns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      },
      flex: 0.5
    },
    {
      field: 'location',
      headerName: 'Location',
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      },
      flex: 0.7
    },
    {
      field: 'date',
      headerName: 'Requested Date & Time',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span
            className={`font-medium text-sm rounded-full px-2 py-1
          ${
            value === 'completed'
              ? ' text-[#0AB626] bg-[#0AB62633]'
              : value === 'assigned'
                ? ' text-[#9747FF] bg-[#9747FF33]'
                : 'text-[#999999] bg-[#99999933] '
          }`}
          >
            {value}
          </span>
        );
      }
    },
    {
      field: 'staff',
      headerName: 'Assigned Staff',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },
    {
      field: 'Action',
      flex: 0.5,
      renderCell: () => {
        return (
          <div className="flex items-center gap-5">
            <div className="w-20">
              <button className="bg-[#7065F0] font-medium text-sm rounded-full px-4 py-2 text-white">
                Edit
              </button>
            </div>

            <div className=" relative z-10 flex w-10  overflow-visible">
              <button
                aria-describedby={id}
                type="button"
                onClick={(e) => handleClick(e)}
                className="cursor-pointer bg-transparent border-none p-0 m-0"
                style={{ lineHeight: 0 }}
              >
                <BsThreeDots size={16} />
              </button>
              <Popper
                ref={dotsPopupRef}
                className="px-5 py-4 text-sm z-10 flex flex-col gap-4 items-center rounded-xl border border-primaryBorder bg-white"
                id={id}
                open={open}
                anchorEl={anchorEl}
              >
                {' '}
                <h5 className="mb-3 font-bold">Actions</h5>
                <div className="space-y-4">
                  <button className=" flex items-center gap-4 hover:underline hover:text-blue-600">
                    <LuEye size={18} /> View Profile
                  </button>
                  <button className=" flex gap-2 items-center hover:underline hover:text-green-600">
                    <SendHorizontal size={18} /> Send Message
                  </button>
                  <button className=" flex gap-2 items-center hover:underline text-red-600">
                    <UserX size={18} /> Suspend User
                  </button>
                  <div className="w-full h-[2px] bg-gray-400" />
                  <button className="flex gap-2 items-center hover:underline text-red-600">
                    <GoTrash size={18} /> Deactivate User
                  </button>
                </div>
              </Popper>
            </div>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    const fetchTourMgt = async () => {
      try {
        // const response = await fetch('/api/overview');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch dashboard overview data');
        // }
        // const { data } = await response.json();
        // console.log('Users Mgt Data:', data);

        setTourMetrics((prev) => ({
          ...prev,
          totalTourReq: {
            title: 'Total Tour Requests',
            count: 245,
            percentageChange: 20
          },
          pendingTour: {
            title: 'Pending Tour',
            count: 450,
            percentageChange: 15
          },
          assignedTour: {
            title: 'Assigned Tour',
            count: 570,
            percentageChange: 0
          }
        }));

        setTableData(TourTableRows());
        // setTableData(data.tourMgt);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTourMgt();
  }, []);

  const metricsArray: Metric[] = Object.values(TourMetrics);
  const TourMgtStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="Tour-mgt-stats"
        className="w-full flex flex-col md:flex-row gap-6"
      >
        <div className="w-full  md:w-[90%] grid grid-cols-1 md:grid-cols-3 gap-4">
          {TourMgtStats?.map((stat, index) => (
            <UserStatsCard
              // cardBgColor="bg-[#7065F0]"
              textColor="text-[#000929]"
              key={index}
              title={stat.title}
              value={stat.value}
              increase={stat.percentage > 0}
              percentage={stat.percentage}
            />
          ))}
        </div>

        <div className="w-full md:w-[10%] flex justify-end items-center">
          <button className="bg-[#7065F0] rounded-xl shadow-md w-full h-full text-white text-[20px]">
            Add Staff
          </button>
        </div>
      </section>

      {/* table section */}
      <section
        id="Tour-mgt-table"
        className={`flex flex-col gap-2 ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center gap-8">
            <h3 className="text-2xl">Tour History</h3>{' '}
            <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
              <PiSlidersHorizontalFill size={18} />
            </button>
          </div>
          <button className="flex items-center text-white gap-2 bg-[#7065F0] rounded-2xl px-4 py-2 ">
            <PiDownloadSimpleFill size={24} />
            Download
          </button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={tableData}
            columns={columns}
            pageSize={10}
            setPageSize={() => {}}
            paginationActive={true}
            showCheckbox={false}
          />
        </div>
      </section>
    </div>
  );
}
