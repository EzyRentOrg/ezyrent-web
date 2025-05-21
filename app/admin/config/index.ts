import image1 from '../assets/Ellipse-4.png';
import image2 from '../assets/Ellipse-6.png';

export const DashboardStats = [
  {
    title: 'Total Properties',
    value: '2,092',
    percentage: 12.3
  },
  {
    title: 'Booked Tours',
    value: '1,313',
    percentage: 12.3
  },
  {
    title: 'Total Users',
    value: '1,092',
    percentage: 5.3
  },
  {
    title: 'Total Revenue',
    value: '$2,092',
    percentage: 8.3
  }
];

export const DashboardMessages = [
  {
    senderName: 'Dieli Doe',
    senderPhoto: image1,
    content: 'I would like to lay a complaint...',
    timeStamp: 'Today'
  },
  {
    senderName: 'John Doe',
    senderPhoto: image2,
    content: 'I am interested in the property you listed.',
    timeStamp: 'Yesterday'
  },
  {
    senderName: 'Dieli Doe',
    senderPhoto: image1,
    content: 'I would like to lay a complaint...',
    timeStamp: 'Today'
  },
  {
    senderName: 'John Doe',
    senderPhoto: image2,
    content: 'I am interested in the property you listed.',
    timeStamp: 'Yesterday'
  }
];

export const DashboardTableRows = () => {
  const statuses = ['Published', 'Pending', 'Failed'];
  const types = ['House', 'Land', 'Car'];

  const rowData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Property ${index + 1}`,
    type: types[index % 3], // Repeats 0, 1, 2 → House, Land, Car
    status: statuses[index % 3], // Repeats 0, 1, 2 → Published, Pending, Failed
    inquiry: `Enquiry ${index + 1}`,
    price: `$${(index + 1) * 1000}`
  }));

  return rowData;
};

export const DashboardAreaChartData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 6000 },
  { name: 'Apr', value: 5020 },
  { name: 'May', value: 7000 }
];

export const AnalyticsLineChartData = [
  { month: 'Jan', listing: 1000, views: 600 },
  { month: 'Feb', listing: 800, views: 910 },
  { month: 'Mar', listing: 1400, views: 3090 },
  { month: 'Apr', listing: 1200, views: 2000 },
  { month: 'May', listing: 1900, views: 2181 }
];

export const AnalyticsPieChartData = [
  { name: 'Revenue', value: 75 },
  { name: 'Sales', value: 25 }
];
