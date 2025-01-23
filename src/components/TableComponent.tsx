import React from 'react';
import { AggregatedData } from '../utils/dataProcessor';

interface TableComponentProps {
  data: AggregatedData[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => (
  <table  style={{ width: '100%', textAlign: 'left' }}>
    <thead>
      <tr>
        <th>Year</th>
        <th>Max Crop</th>
        <th>Min Crop</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.year}</td>
          <td>{item.maxCrop}</td>
          <td>{item.minCrop}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableComponent;
