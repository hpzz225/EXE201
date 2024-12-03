import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowUpRight } from "lucide-react";
import { TrendingUp } from "lucide-react";
import StarRatingFeedback from "../../_components/FeedbackBox";
import { OrderChart } from "../../_components/OrderChart";
// Sample data (replace with your actual data fetching logic)
const sampleMetrics = {
  totalRevenue: 54750.25,
  totalOrders: 1245,
  totalUsers: 5678,
  totalCustomers: 4532,
  totalFeedbacks: 342,
};

const monthlyOrdersData = [
  { month: "Jan", orders: 210 },
  { month: "Feb", orders: 185 },
  { month: "Mar", orders: 250 },
  { month: "Apr", orders: 300 },
  { month: "May", orders: 275 },
  { month: "Jun", orders: 320 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const TrangChu = () => {
  const metricsData = [
    {
      title: "Total Revenue",
      value: `$${sampleMetrics.totalRevenue.toLocaleString()}`,
      icon: <ArrowUpRight className="text-green-500" />,
    },
    {
      title: "Total Orders",
      value: sampleMetrics.totalOrders.toLocaleString(),
      icon: <ArrowUpRight className="text-blue-500" />,
    },
    {
      title: "Total Users",
      value: sampleMetrics.totalUsers.toLocaleString(),
      icon: <ArrowUpRight className="text-purple-500" />,
    },
  ];

  const metricsData2 = [
    {
      title: "Total Customers",
      value: sampleMetrics.totalCustomers.toLocaleString(),
      icon: <ArrowUpRight className="text-orange-500" />,
    },
    {
      title: "Total Feedbacks",
      value: sampleMetrics.totalFeedbacks.toLocaleString(),
      icon: <ArrowUpRight className="text-red-500" />,
    },
  ];
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Metrics Cards - First Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {metricsData.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Metrics Cards - Second Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {metricsData2.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <OrderChart />
        <StarRatingFeedback />
      </div>
    </div>
  );
};

export default TrangChu;
