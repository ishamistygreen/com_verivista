import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import StreamingDownloader from "./StreamingDownloader";
import MyZipJsonDownloader from "./MyZipJsonDownloader";

function App() {
  const [LargeJsonDownloader, setLargeJsonDownloader] = useState(null);

  useEffect(() => {
    let dynamicImport;
    if (process.env.NODE_ENV === "production") {
      dynamicImport = import("./LargeJsonDownloader");
    } else {
      dynamicImport = import("./LargeJsonDownloader");
    }

    dynamicImport
      .then((module) => {
        setLargeJsonDownloader(() => module.default);
      })
      .catch((error) => {
        console.error("Dynamic import failed: ", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Environment: {process.env.REACT_APP_ENVIRONMENT}</p>
          <p>API URL: {process.env.REACT_APP_API_URL}</p>
        </div>
        <br />
        {LargeJsonDownloader && <LargeJsonDownloader />}
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
