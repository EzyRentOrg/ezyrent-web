'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { GoTrash } from 'react-icons/go';
import { UserMgtTableRows } from '../../config';
import MuiTableComponent from '../dashboard/TableCoponent';
import { SendHorizontal, UserX } from 'lucide-react';
import {
  PiDownloadSimpleFill,
  PiPhoneLight,
  PiSlidersHorizontalFill
} from 'react-icons/pi';
import { MdOutlineMail } from 'react-icons/md';
import { useClickAway } from 'react-use';
import { BsThreeDots } from 'react-icons/bs';
import { Popper } from '@mui/material';
import { LuEye } from 'react-icons/lu';
import { UserStatsCard } from '../statCard';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import Link from 'next/link';

interface UserMgtProps {
  isSidebarExpanded: boolean;
}

export default function UserMgt({ isSidebarExpanded }: UserMgtProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const [UserMetrics, setUserMetrics] = useState({
    totalUsers: {
      title: 'Total Users',
      count: 0,
      percentageChange: 0
    },
    verifiedUsers: { title: 'Verified Users', count: 0, percentageChange: 0 },
    freeUsers: { title: 'Free Users', count: 0, percentageChange: 0 }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents bubbling
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Users',
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      },
      flex: 0.7
    },
    {
      field: 'role',
      headerName: 'Role',
      renderCell: ({ value }) => {
        return (
          <span
            className={`  font-medium text-sm rounded-full px-2 py-1
          ${
            value === 'Landlord'
              ? ' bg-[#9747FF33] text-[#9747FF] border '
              : ' text-[#7065F0] bg-[#7065F033] border'
          }`}
          >
            {value}
          </span>
        );
      },
      flex: 0.5
    },
    {
      field: 'contact',
      headerName: 'Contact',
      flex: 0.9,
      renderCell: (params) => {
        const { phone, email } = params.value || {};
        return (
          <div className="flex flex-col text-[#7065F0]">
            <span className="flex items-center gap-1  font-medium text-sm">
              <PiPhoneLight className="text-[#000929]" />
              {phone}
            </span>
            <span className=" text-sm font-medium flex items-center gap-1 ">
              <MdOutlineMail className="text-[#000929]" /> {email}
            </span>
          </div>
        );
      }
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
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span
            className={`font-medium text-sm rounded-full px-2 py-1
          ${
            value === 'Active'
              ? ' text-[#0AB626] bg-[#0AB62633]'
              : value === 'Suspended'
                ? ' text-[#DC1313] bg-[#FF090917]'
                : 'text-[#999999] bg-[#99999933] '
          }`}
          >
            {value}
          </span>
        );
      }
    },
    {
      field: 'verificationStatus',
      headerName: 'V.Status',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span
            className={`  font-medium flex items-center gap-1 text-sm rounded-full px-2 py-1
          ${
            value === 'Verified'
              ? ' text-[#7065F0] bg-[#7065F033] '
              : 'text-[#999999] bg-[#9999991A]'
          }`}
          >
            {value}
            {value === 'Verified' && <HiMiniCheckBadge />}
          </span>
        );
      }
    },
    {
      field: 'Action',
      flex: 0.8,
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center gap-5">
            <div className="w-20">
              {row.verificationStatus === 'Verified' ? (
                <Link
                  href={'/'}
                  className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
                >
                  view
                </Link>
              ) : (
                <Link
                  href={'/'}
                  className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
                >
                  message
                </Link>
              )}
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
    const fetchUsersMgt = async () => {
      try {
        const response = await fetch('/api/overview');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard overview data');
        }
        const { data } = await response.json();
        console.log('Users Mgt Data:', data);

        setUserMetrics((prev) => ({
          ...prev,
          totalUsers: {
            title: 'Total Users',
            count: 245,
            percentageChange: 20
          },
          verifiedUsers: {
            title: 'New Users',
            count: 450,
            percentageChange: 15
          },
          freeUsers: {
            title: 'Active Users',
            count: 570,
            percentageChange: 0
          }
        }));
      } catch (error) {
        console.error('Error fetching User mgt:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const { data } = await response.json();
        console.log('Users Data:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsersMgt();
    fetchUsers();
  }, []);

  const metricsArray: Metric[] = Object.values(UserMetrics);
  const UserMgtStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="User-mgt-stats"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {UserMgtStats?.map((stat, index) => (
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
      </section>

      {/* table section */}
      <section
        id="user-mgt-table"
        className={`flex flex-col gap-2 ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center gap-8">
            <h3 className="text-2xl">User Data</h3>{' '}
            <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
              <PiSlidersHorizontalFill size={18} />
            </button>
          </div>
          <button className="flex items-center text-white gap-2 bg-[#7065F0] rounded-lg px-4 py-2 ">
            <PiDownloadSimpleFill size={24} />
            Download
          </button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={UserMgtTableRows()}
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
