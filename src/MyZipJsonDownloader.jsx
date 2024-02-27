import React, { useState } from 'react';
import JSZip from 'jszip';

const MyZipJsonDownloader = ({ url, fileName }) => {
  const [jsonData, setJsonData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const zipData = await response.arrayBuffer();
      const zip = await JSZip.loadAsync(zipData);
      const jsonFile = zip.file(fileName);
      if (jsonFile) {
        const uncompressedData = await jsonFile.async('string');
        const jsonData = JSON.parse(uncompressedData);
        setJsonData(jsonData.slice(0, 10)); // Slice the first 10 rows
        console.log(jsonData);
      } else {
        throw new Error('JSON file not found in the ZIP archive.');
      }
    } catch (error) {
      console.error('Error fetching or parsing JSON:', error);
    }
  };

  const handleShowJson = () => {
    fetchData();
  };

  return (
    <div>
      <button onClick={handleShowJson} disabled={jsonData !== null}>
        {jsonData ? 'JSON Loaded' : 'Load JSON'}
      </button>
      {jsonData && (
        <div>
          Display only the first 10 rows of JSON data
          {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default MyZipJsonDownloader;
