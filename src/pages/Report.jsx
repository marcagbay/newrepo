import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getReport, generateReport } from 'wasp/client/operations';

const ReportPage = () => {
  const { data: report, isLoading, error } = useQuery(getReport);
  const generateReportFn = useAction(generateReport);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleGenerateReport = () => {
    generateReportFn({ userId: 123, transactionData: 'sample data', dateRange: '2022-01-01 - 2022-12-31' });
  };

  return (
    <div className='p-4'>
      <button
        onClick={handleGenerateReport}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Generate Report
      </button>
      {report && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Generated Report</h2>
          <p>User ID: {report.userId}</p>
          <p>Transaction Data: {report.transactionData}</p>
          <p>Date Range: {report.dateRange}</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;