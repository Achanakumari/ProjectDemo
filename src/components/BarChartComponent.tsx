import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BarChartData } from '../utils/dataProcessor';

interface BarChartComponentProps {
  data: BarChartData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => (
  <BarChart width={1000} height={500} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="cropName" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="avgYield" fill="#82ca9d" />
  </BarChart>
);

export default BarChartComponent;
