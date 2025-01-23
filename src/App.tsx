
import React, { useEffect, useState } from 'react';
import TableComponent from './components/TableComponent';
import BarChartComponent from './components/BarChartComponent';
import { sanitizeData, processTableData, processBarChartData, AggregatedData, BarChartData } from './utils/dataProcessor';
import './App.css';

const App: React.FC = () => {
  const [tableData, setTableData] = useState<AggregatedData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Manufac _ India Agro Dataset.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch dataset: ${response.statusText}`);
        }

        const rawData = await response.json();
        const sanitizedData = sanitizeData(rawData); // Sanitize the data
        setTableData(processTableData(sanitizedData));
        setBarChartData(processBarChartData(sanitizedData));
      } catch (err: unknown) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Agriculture Data Analysis</h1>

      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <>
          <TableComponent data={tableData} />
          <BarChartComponent data={barChartData} />
        </>
      )}
    </div>
  );
};

export default App;