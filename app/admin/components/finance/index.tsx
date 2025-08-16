'use client';
import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { FinanceTableRows } from '../../config';
import MuiTableComponent from '../TableComponent';
import { PiSlidersHorizontalFill } from 'react-icons/pi';
import { UserStatsCard } from '../statCard';
import Link from 'next/link';
import { formatAmount } from '@/app/util';

interface FinanceProps {
  isSidebarExpanded: boolean;
}

export default function Finance({ isSidebarExpanded }: FinanceProps) {
  const [UserMetrics, setUserMetrics] = useState({
    totalRevenue: {
      title: 'Total Revenue',
      count: 0,
      percentageChange: 0
    },
    inspectionRevenue: {
      title: 'Inspection Revenue',
      count: 0,
      percentageChange: 0
    },
    revenueFromRent: {
      title: 'Revenue from Rent',
      count: 0,
      percentageChange: 0
    }
  });

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      },
      flex: 0.5
    },

    {
      field: 'paymentType',
      headerName: 'Payment Type',
      flex: 0.6,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },
    {
      field: 'senderName',
      headerName: 'Sender Name',
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      },
      flex: 0.5
    },
    {
      field: 'role',
      headerName: 'Sender Type',
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
      field: 'property',
      headerName: 'Property',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },

    {
      field: 'ezyRentCharge',
      headerName: 'EzyRent Charge',
      flex: 0.5,
      renderCell: ({ value }) => {
        return (
          <span className="text-[#7065F0] text-sm font-medium">{value}</span>
        );
      }
    },
    {
      field: 'netToReceiver',
      headerName: 'Net To Receiver',
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
            className={` font-medium text-sm rounded-full px-2 py-1
            ${
              value === 'paid'
                ? ' text-[#32A071] bg-[#32A07133]'
                : value === 'refunded'
                  ? ' text-[#9747FF] bg-[#9747FF33]'
                  : value === 'failed'
                    ? ' text-[#E30000CC] bg-[#E3000026]'
                    : 'text-[#F7CE45] bg-[#F7CE4533] '
            }`}
          >
            {value}
          </span>
        );
      }
    },
    {
      field: 'Action',
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <div className="w-20">
            {row.status === 'paid' ? (
              <Link
                href={'/'}
                className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
              >
                View
              </Link>
            ) : row.status === 'refunded' ? (
              <Link
                href={'/'}
                className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
              >
                Message
              </Link>
            ) : row.status === 'failed' ? (
              <Link
                href={'/'}
                className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
              >
                Retry
              </Link>
            ) : (
              <Link
                href={'/'}
                className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
              >
                Cancel
              </Link>
            )}
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    const fetchUsersMgt = async () => {
      try {
        // const response = await fetch('/api/overview');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch dashboard overview data');
        // }
        // const { data } = await response.json();
        // console.log('Users Mgt Data:', data);

        setUserMetrics((prev) => ({
          ...prev,
          totalRevenue: {
            title: 'Total Revenue',
            count: 450325.31,
            percentageChange: 20
          },
          inspectionRevenue: {
            title: 'New Inspection Revenue',
            count: 427755.2,
            percentageChange: 15
          },
          revenueFromRent: {
            title: 'Revenue from Rent',
            count: 143890.44,
            percentageChange: 0
          }
        }));
      } catch (error) {
        console.error('Error fetching User mgt:', error);
      }
    };

    fetchUsersMgt();
  }, []);

  const metricsArray: Metric[] = Object.values(UserMetrics);
  const FinanceStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: formatAmount(metric.count),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="Finance-stats"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {FinanceStats?.map((stat, index) => (
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
        id="Finance-mgt-table"
        className={`flex flex-col gap-2 ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex items-center my-5 gap-8">
          <h3 className="text-2xl">Transaction History</h3>{' '}
          <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
            <PiSlidersHorizontalFill size={18} />
          </button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={FinanceTableRows()}
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
