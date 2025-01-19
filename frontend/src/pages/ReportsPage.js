import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/ReportsPage.css";

Chart.register(ArcElement, Tooltip, Legend);

const ReportsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/training/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
        setError("");
      } catch (error) {
        setError("Failed to fetch analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (!analytics) return <div className="error">{error}</div>;

  const exportCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/training/analytics/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "analytics-report.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError("Failed to export CSV.");
    }
  };

  const fetchFilteredAnalytics = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/training/analytics?startDate=${startDate}&endDate=${endDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalytics(response.data);
    } catch (error) {
      setError("Failed to fetch filtered analytics.");
    }
  };

  const chartData = analytics?.contentTypeCount?.length
    ? {
        labels: analytics.contentTypeCount.map((item) => item._id),
        datasets: [
          {
            data: analytics.contentTypeCount.map((item) => item.count),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      }
    : { labels: ["No Data"], datasets: [{ data: [1], backgroundColor: ["#cccccc"] }] };

  return (
    <div className="reports-container">
      <h1>System-Wide Reports</h1>
      <div className="pie-chart-container">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>
      <div className="date-filter">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button className="filter" onClick={fetchFilteredAnalytics}>Filter</button>
      </div>
      <button onClick={exportCSV} className="export-btn">Export as CSV</button>
      <div className="report-card">
        <h3>Total Modules</h3>
        <p>{analytics.totalModules}</p>
      </div>
      <div className="report-card">
        <h3>Content Type Breakdown</h3>
        <ul>
          {analytics.contentTypeCount.map((item) => (
            <li key={item._id}>{item._id}: {item.count}</li>
          ))}
        </ul>
      </div>
      <div className="report-card">
        <h3>Most Recent Modules</h3>
        <ul>
          {analytics.recentModules.map((module) => (
            <li key={module._id}>{module.title} ({module.contentType})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportsPage;
