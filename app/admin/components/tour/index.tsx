'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { GoTrash } from 'react-icons/go';
import { SendHorizontal, UserX } from 'lucide-react';
import { PiDownloadSimpleFill, PiSlidersHorizontalFill } from 'react-icons/pi';
import { useClickAway } from 'react-use';
import { BsThreeDots } from 'react-icons/bs';
import { Popper } from '@mui/material';
import { LuEye } from 'react-icons/lu';
import { UserStatsCard } from '../statCard';
import { formatDateTime } from '@/lib/utils';
import MuiTableComponent from '../dashboard/TableCoponent';

interface TourMgtProps {
  isSidebarExpanded: boolean;
}

type TourTableRow = {
  id: string;
  userName: string;
  tourDate: string;
  tourTime: string;
  propertyAddress: string;
  status: string;
  staff?: string;
};

type Metric = {
  title: string;
  count: number;
  percentageChange: number;
};

type MetricsState = {
  totalTourReq: Metric;
  pendingTour: Metric;
  assignedTour: Metric;
};

const initialMetrics: MetricsState = {
  totalTourReq: { title: 'Total Tour Requests', count: 0, percentageChange: 0 },
  pendingTour: { title: 'Pending Tour', count: 0, percentageChange: 0 },
  assignedTour: { title: 'Assigned Tour', count: 0, percentageChange: 0 }
};

export default function TourMgt({ isSidebarExpanded }: TourMgtProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const [tourMetrics, setTourMetrics] = useState<MetricsState>(initialMetrics);
  const [tableData, setTableData] = useState<TourTableRow[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const columns: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'User',
      flex: 0.5,
      renderCell: ({ value }) => (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      )
    },
    {
      field: 'propertyAddress',
      headerName: 'Location',
      flex: 0.7,
      renderCell: ({ value }) => (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      )
    },
    {
      field: 'tourDate',
      headerName: 'Requested Date & Time',
      flex: 0.5,
      renderCell: ({ row }) => (
        <span className="text-[#7065F0] text-sm font-medium">
          {formatDateTime(row.tourDate, row.tourTime)}
        </span>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: ({ value }) => (
        <span
          className={`font-medium text-sm rounded-full px-2 py-1
            ${
              value === 'CONFIRMED'
                ? 'text-[#0AB626] bg-[#0AB62633]'
                : value === 'PENDING'
                  ? 'text-[#9747FF] bg-[#9747FF33]'
                  : 'text-[#999999] bg-[#99999933]'
            }`}
        >
          {value}
        </span>
      )
    },
    {
      field: 'staff',
      headerName: 'Assigned Staff',
      flex: 0.5,
      renderCell: ({ value }) => (
        <span className="text-[#7065F0] text-sm font-medium">
          {value || '—'}
        </span>
      )
    },
    {
      field: 'Action',
      flex: 0.5,
      renderCell: () => (
        <div className="flex items-center gap-5">
          <div className="w-20">
            <button className="bg-[#7065F0] font-medium text-sm rounded-full px-4 py-2 text-white">
              Edit
            </button>
          </div>

          <div className="relative z-10 flex w-10 overflow-visible">
            <button
              aria-describedby={id}
              type="button"
              onClick={handleClick}
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
              <h5 className="mb-3 font-bold">Actions</h5>
              <div className="space-y-4">
                <button className="flex items-center gap-4 hover:underline hover:text-blue-600">
                  <LuEye size={18} /> View Profile
                </button>
                <button className="flex gap-2 items-center hover:underline hover:text-green-600">
                  <SendHorizontal size={18} /> Send Message
                </button>
                <button className="flex gap-2 items-center hover:underline text-red-600">
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
      )
    }
  ];

  useEffect(() => {
    const fetchTourMgt = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/get-all-bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const responseJson = await response.json();
        const bookings = responseJson?.data?.data;

        if (!Array.isArray(bookings)) throw new Error('Invalid response');
        setTableData(bookings);

        const pending = bookings.filter(
          (item) => item.status === 'PENDING'
        ).length;
        const assigned = bookings.filter(
          (item) => item.status === 'ASSIGNED'
        ).length;

        setTourMetrics({
          totalTourReq: {
            title: 'Total Tour Requests',
            count: bookings.length,
            percentageChange: 20
          },
          pendingTour: {
            title: 'Pending Tour',
            count: pending,
            percentageChange: 15
          },
          assignedTour: {
            title: 'Assigned Tour',
            count: assigned,
            percentageChange: 10
          }
        });

        setTableData(bookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourMgt();
  }, []);

  const TourMgtStats = Object.values(tourMetrics).map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* stats section */}
      <section className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-3 gap-4">
          {TourMgtStats.map((stat, index) => (
            <UserStatsCard
              key={index}
              textColor="text-[#000929]"
              title={stat.title}
              value={stat.value}
              increase={stat.percentage > 0}
              percentage={stat.percentage}
            />
          ))}
        </div>
      </section>

      {/* table section */}
      <section
        className={`flex flex-col gap-2 ${
          isSidebarExpanded ? 'w-[1100px] mx-auto' : 'ml-0 w-full'
        } rounded-2xl`}
      >
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between p-5 md:items-center">
          <div className="flex items-center gap-8">
            <h3 className="text-2xl">Tour History</h3>
            <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
              <PiSlidersHorizontalFill size={18} />
            </button>
          </div>
          <div className="flex items-center gap-10">
            <button className="bg-[#7065F0] rounded-xl w-fit h-full text-white text-sm px-4 py-2">
              Add Staff
            </button>

            <button className="flex items-center text-sm text-white gap-2 bg-[#7065F0] rounded-2xl px-4 py-2">
              <PiDownloadSimpleFill size={24} />
              Download
            </button>
          </div>
        </div>

        <div className="w-full min-h-[200px]">
          {loading ? (
            <div className="text-center text-lg py-10">Loading bookings...</div>
          ) : (
            <MuiTableComponent
              rows={tableData}
              columns={columns}
              pageSize={10}
              setPageSize={() => {}}
              paginationActive={true}
              showCheckbox={false}
            />
          )}
        </div>
      </section>
    </div>
  );
}
