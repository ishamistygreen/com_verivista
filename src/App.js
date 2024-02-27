import logo from "./logo.svg";
import "./App.css";
import LargeJsonDownloader from "./LargeJsonDownloader";
import StreamingDownloader from "./StreamingDownloader";
import MyZipJsonDownloader from "./MyZipJsonDownloader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LargeJsonDownloader></LargeJsonDownloader>
        <br></br>
        <StreamingDownloader></StreamingDownloader>
        <br></br>
        {/* <MyZipJsonDownloader
          url="https://forjson.s3.ap-southeast-2.amazonaws.com/users_1m.zip"
          fileName="users_1m.json"
        ></MyZipJsonDownloader> */}
        <MyZipJsonDownloader
          url="https://forjson.s3.ap-southeast-2.amazonaws.com/users_100k.zip"
          fileName="users_100k.json"
        ></MyZipJsonDownloader>
      </header>
    </div>
  );
}

export default App;
