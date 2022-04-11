import { useEffect, useState } from "react";
import ContentTable from "./components/ContentTable";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <ContentTable
        data={data}
        dataSource={dataSource}
        setData={setData}
        setDataSource={setDataSource}
      />
    </>
  );
}

export default App;
