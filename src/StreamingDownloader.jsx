import React, { useState } from "react";

const StreamingDownloader = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    fetch("https://forjson.s3.ap-southeast-2.amazonaws.com/users_1m.json")
      .then((response) => {
        // Assuming the response is a readable stream
        const reader = response.body.getReader();
        const stream = new ReadableStream({
          start(controller) {
            function pump() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  setDownloading(false);
                  return;
                }
                controller.enqueue(value);
                pump();
              });
            }
            pump();
          },
        });
        const blobStream = new Blob([stream], { type: "application/json" });
        const url = window.URL.createObjectURL(blobStream);
        const a = document.createElement("a");
        a.href = url;
        a.download = "large_file.json";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading JSON:", error);
        setDownloading(false);
      });
  };

  return (
    <button onClick={handleDownload} disabled={downloading}>
      {downloading ? "Downloading..." : "Download Streaming JSON"}
    </button>
  );
};

export default StreamingDownloader;
