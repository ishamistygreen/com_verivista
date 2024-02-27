import React, { useState } from "react";

const LargeJsonDownloader = () => {
  const [progress, setProgress] = useState(0);

  const downloadJsonFile = async () => {
    const url = "https://forjson.s3.ap-southeast-2.amazonaws.com/users_100k.json";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download JSON file");
    }

    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    let chunks = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
      setProgress((receivedLength / contentLength) * 100);
    }

    // Combine all chunks into a single Uint8Array
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    // Convert the Uint8Array to JSON
    const jsonString = new TextDecoder("utf-8").decode(chunksAll);
    const jsonData = JSON.parse(jsonString);

    // Do something with the JSON data
    console.log(jsonData);
  };

  return (
    <div>
      <button onClick={downloadJsonFile}>Download JSON File</button>
      {progress > 0 && <p>Downloading... {progress.toFixed(2)}%</p>}
    </div>
  );
};

export default LargeJsonDownloader;
