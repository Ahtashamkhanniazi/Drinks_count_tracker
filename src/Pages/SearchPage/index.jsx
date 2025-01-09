import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustonButton from '../../Components/Button';

function SearchPage() {
  const [activeTab, setActiveTab] = useState('entry-by-id');
  const [entryData, setEntryData] = useState(null);
  const [entriesData, setEntriesData] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2025-01-01T00:00:00Z'));
  const [endDate, setEndDate] = useState(new Date('2025-01-13T19:00:00Z'));
  const [loading, setLoading] = useState(false);
  const [entryId, setEntryId] = useState('5a1eb3b7-9afe-4749-aa67-73629812243a');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchEntryById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/entry-by-id/${id}`);
      if (response.data.entry) {
        setEntryData(response.data.entry);
      } else {
        setEntryData(null);
      }
    } catch (error) {
      console.error('Error fetching Entry by ID:', error);
      setEntryData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntriesWithDate = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const response = await axios.get(`${REACT_APP_BASE_URL}/entries-with-date`, {
        params: {
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          page: currentPage,
          page_size: 8,
        },
      });

      const { entries_with_images, total_entries } = response.data;
      setEntriesData(entries_with_images);
      setTotalEntries(total_entries);
    } catch (error) {
      console.error('Error fetching Entries with Date:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = () => {
    fetchEntryById(entryId);
  };

  const handleSearchByDate = () => {
    fetchEntriesWithDate();
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalEntries / 8);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (activeTab === 'entry-by-id') {
      fetchEntryById(entryId);
    } else if (activeTab === 'entries-with-date') {
      fetchEntriesWithDate();
    }
  }, [currentPage]);

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <CustonButton
          title="Entry by ID"
          onClick={() => setActiveTab('entry-by-id')}
        />
        <CustonButton
          title="Entries with Date"
          onClick={() => setActiveTab('entries-with-date')}
        />
      </div>

      <div className="mb-6">
        {activeTab === 'entry-by-id' && (
          <div>
            <input
              type="text"
              value={entryId}
              onChange={(e) => setEntryId(e.target.value)}
              placeholder="Enter Entry ID"
              className="border border-gray-300 p-2 rounded mb-4"
            />
            <CustonButton title="Search" onClick={handleSearchById} />
          </div>
        )}

        {activeTab === 'entries-with-date' && (
          <div>
            <div className="mb-2">
              <label className="block mb-1">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <CustonButton title="Search" onClick={handleSearchByDate} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : activeTab === 'entry-by-id' && entryData ? (
          <div className="border p-4 rounded">
            <img
              src={`data:image/jpeg;base64,${entryData.base64_img}`}
              alt="Entry Image"
              className="w-[150px] h-auto mb-4"
            />
            <p>{new Date(entryData.timestamp).toLocaleString()}</p>
          </div>
        ) : activeTab === 'entries-with-date' && entriesData.length > 0 ? (
          entriesData.map((entry, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <img
                src={`data:image/jpeg;base64,${entry.base64_img}`}
                alt={`Entry ${index}`}
                className="w-[150px] h-auto mb-4"
              />
              <p>{new Date(entry.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      {activeTab === 'entries-with-date' && entriesData.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <CustonButton
            title="Previous"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          />
          <span className="px-4 py-2">Page {currentPage}</span>
          <CustonButton
            title="Next"
            onClick={goToNextPage}
            disabled={currentPage * 8 >= totalEntries}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
