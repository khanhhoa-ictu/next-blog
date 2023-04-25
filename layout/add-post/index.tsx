import { Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertImages } from "../../helper";
import React, { useState } from "react";
import { IPost } from "../../types/managerType";
import Editors from "../../components/editor";
import styles from "./style.module.scss";
interface AddPostProps {
  isModalVisible: boolean;
  handleOk: (data: IPost) => void;
  handleCancel: () => void;
}
const { Option } = Select;
function AddPost(props: AddPostProps) {
  const { isModalVisible, handleOk, handleCancel } = props;
  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(1);
  const onEditorStateChange = (value: any) => {
    const html = draftToHtml(convertToRaw(value.getCurrentContent()));
    setContent(convertImages(html));
    setEditorState(value);
  };
  const handleCancelModal = () => {
    setEditorState("");
    handleCancel();
  };
  const handleOkModal = () => {
    const data = {
      title,
      content,
      summary,
      thumbnail,
      category_id: category,
    };
    handleOk(data);
  };
  return (
    <Modal
      title="Add post"
      visible={isModalVisible}
      onOk={handleOkModal}
      onCancel={handleCancelModal}
      wrapClassName={styles.wrapperModal}
    >
      <div className={styles.fromItem}>
        <label>tiêu đề</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={styles.fromItem}>
        <label>Nội dung bài viết</label>
        <Editors
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <div className={styles.fromItem}>
        <label>Nội dung tóm tắt</label>
        <TextArea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div className={styles.fromItem}>
        <label>thumbnail</label>
        <Input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>
      <div className={styles.fromItem}>
        <label>thể loại</label>
        <Select
          defaultValue={category}
          onChange={(value) => setCategory(value)}
        >
          <Option value={1}>html-css</Option>
          <Option value={2}>javascript</Option>
          <Option value={3}>reactJs</Option>
        </Select>
      </div>
    </Modal>
  );
}

export default AddPost;
