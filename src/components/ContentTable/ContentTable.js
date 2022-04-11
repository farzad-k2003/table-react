import { useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import ModalComponent from "../ModalComponent/ModalComponent";
import "./ContentTable.css";

function ContentTable({ data, dataSource, setData, setDataSource }) {
  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const myData = res.data;
        setData(myData);
        console.log(myData);
      });
  };

  const handleClick = () => {
    if (dataSource.length) {
      for (let i = 0; i <= dataSource.length; i++) {
        for (let j = 0; j <= dataSource.length; j++) {
          if (dataSource[i].id !== data[j].id) {
            data[j].key = data[j].id;
            let newArr = [...dataSource, data[j]];
            setDataSource(newArr);
          } else {
            console.log("ERROR");
          }
        }
      }
    } else if (dataSource.length === 0) {
      for (let i = 0; i <= dataSource.length; i++) {
        data[i].key = data[i].id;
        let newArr = [...dataSource, data[i]];
        setDataSource(newArr);
      }
    }
  };

  useEffect(getData, [0]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      width: "150px",
      render: (id) => {
        return (
          <>
            <ModalComponent
              title="Edit"
              btnId={id}
              currentData={dataSource}
              setCurrentData={setDataSource}
            />
            <ModalComponent
              title="Delete"
              btnId={id}
              currentData={dataSource}
              setCurrentData={setDataSource}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <button onClick={handleClick}>Press Me</button>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default ContentTable;
