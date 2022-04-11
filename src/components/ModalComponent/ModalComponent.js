import { logDOM, render } from "@testing-library/react";
import { Modal, Button } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ModalComponent.css";

const ModalComponent = ({ title, btnId, currentData, setCurrentData }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentDeleteBtn, setCurrentDeleteBtn] = useState();
  const [currentEditBtn, setCurrentEditBtn] = useState();
  const [editUserId, setEditUserId] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editDesc, setEditDesc] = useState();
  const [editId, setEditId] = useState();

  const deleteHandler = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${+currentDeleteBtn}`)
      .then(() => console.log("Deleted"));
    const newData = currentData.filter((item) => {
      if (+item.id !== +currentDeleteBtn) {
        return item;
      } else {
        return;
      }
    });
    setCurrentData(newData);
  };
  const formData = (id) => {
    currentData.map((item) => {
      if (+item.id === +id) {
        console.log(item);
        setEditId(item.id);
        setEditDesc(item.body);
        setEditTitle(item.title);
        setEditUserId(item.userId);
      } else {
        return;
      }
    });
  };
  const modalVisiblility = (event) => {
    if (event.target.innerText === "Edit") {
      setEditVisible(true);
      // setCurrentEditBtn(event.target.id);
      formData(event.target.id);
    } else if (event.target.innerText === "Delete") {
      setDeleteVisible(true);
      setCurrentDeleteBtn(event.target.id);
    }
  };

  const editModalOk = () => {
    let newItem = {
      body: editDesc,
      id: editId,
      key: editId,
      title: editTitle,
      userId: editUserId,
    };
    let tempData = [...currentData];
    let secTempData = tempData.filter((item) => {
      return +item.id !== +editId;
    });
    let newArr = [...secTempData, newItem];
    function compare(a, b) {
      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }
      return 0;
    }
    newArr.sort(compare);
    setCurrentData(newArr);
    console.log(newArr);
    setEditVisible(false);
  };

  const deleteModalOk = () => {
    setDeleteVisible(false);
    deleteHandler();
  };
  const deleteModalCancel = () => {
    setDeleteVisible(false);
  };

  const editContent = () => {
    return (
      <form className="edit-field" onSubmit={() => console.log("Hi")}>
        <label htmlFor="edit-id">ID</label>
        <input type="text" readOnly value={editId} id="edit-id" />
        <label htmlFor="edit-title">Title</label>
        <input
          type="text"
          value={editTitle}
          id="edit-title"
          onChange={(e) => {
            setEditTitle(e.target.value);
            console.log(e.target.value);
          }}
        />
        <label htmlFor="edit-desc">Description</label>
        <input
          type="text"
          value={editDesc}
          id="edit-desc"
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <label htmlFor="edit-user-id">User ID</label>
        <input
          type="text"
          value={editUserId}
          id="edit-user-id"
          onChange={(e) => setEditUserId(e.target.value)}
        />
      </form>
    );
  };
  return (
    <>
      <button
        id={btnId}
        className={title === "Edit" ? "edit-btn" : "delete-btn"}
        onClick={(e) => modalVisiblility(e)}
      >
        {title}
      </button>
      <Modal
        title={title}
        visible={title === "Edit" ? editVisible : deleteVisible}
        onCancel={title === "Edit" ? editModalOk : deleteModalCancel}
        onOk={title === "Edit" ? editModalOk : deleteModalOk}
        okText={title === "Edit" ? "Ok" : "Yes"}
        cancelText={title === "Edit" ? "Cancel" : "No"}
      >
        {title === "Edit"
          ? editContent()
          : "Are you sure you want to delete this item?"}
      </Modal>
    </>
  );
};

export default ModalComponent;
