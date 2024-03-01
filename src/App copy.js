import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import StreamingDownloader from "./StreamingDownloader";
import MyZipJsonDownloader from "./MyZipJsonDownloader";
import LargeJsonDownloader from "./LargeJsonDownloader"; // Default import, assuming it's for non-localhost

// Check if the app is running on localhost
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

if (isLocalhost) {
  // If running from localhost, switch the import
  LargeJsonDownloader = require("./LargeJsonDownloader").default;
}

function App() {
  const [largeJsonDownloader, setLargeJsonDownloader] = useState(null);

  useEffect(() => {
    setLargeJsonDownloader(() => LargeJsonDownloader);
  }, []);

  const handleLargeJsonDownload = () => {
    if (largeJsonDownloader) {
      // Assuming "download" is the method you want to call
      largeJsonDownloader.download();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Environment: {isLocalhost ? "localhost" : "production"}</p>
          <p>
            API URL:{" "}
            {isLocalhost
              ? "http://localhost/api"
              : "https://production.api.com"}
          </p>
        </div>
        <br />
        <button onClick={handleLargeJsonDownload}>Download Large JSON</button>
        <br />
        <StreamingDownloader />
        <br />
        <MyZipJsonDownloader
          url="https://forjson.s3.ap-southeast-2.amazonaws.com/users_100k.zip"
          fileName="users_100k.json"
        />
      </header>
    </div>
  );
}

export default App;
