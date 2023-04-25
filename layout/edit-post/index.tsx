import { Input, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getPostDetailAdmin } from "../../api-client/post-detail";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertImages } from "../../helper";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "../../types/managerType";
import Editors from "../../components/editor";
import styles from "./style.module.scss";
interface AddPostProps {
  isModalVisible: boolean;
  handleOk: (data: IPost) => void;
  handleCancel: () => void;
  id: any;
}
const { Option } = Select;

function EditPost(props: AddPostProps) {
  const { isModalVisible, handleOk, handleCancel, id } = props;
  const [rootData, setRootData] = useState<any>(EditorState.createEmpty());
  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(1);
  const { data } = useQuery(["getDetailPost", id], () =>
    getPostDetailAdmin(id)
  );

  const onEditorStateChange = (value: any) => {
    const html = draftToHtml(convertToRaw(value.getCurrentContent()));
    setContent(convertImages(html));
    setEditorState(value);
  };

  const handleCancelModal = () => {
    setEditorState(rootData);
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

    const html = htmlToDraft(content);
    let htmlBlock = ContentState.createFromBlockArray(html.contentBlocks);
    const editorState = EditorState.createWithContent(htmlBlock);
    setRootData(editorState);
    handleOk(data);
  };

  useEffect(() => {
    if (!data) return;
    setTitle(data?.title);
    const html = htmlToDraft(data?.content);
    let htmlBlock = ContentState.createFromBlockArray(html.contentBlocks);
    const editorState = EditorState.createWithContent(htmlBlock);
    setEditorState(editorState);
    setRootData(editorState);
    setSummary(data?.summary);
    setThumbnail(data?.thumbnail);
    setCategory(data?.category_id);
  }, [data]);

  return (
    <Modal
      title="Edit post"
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
        <Select value={category} onChange={(value) => setCategory(value)}>
          <Option value={1}>html-css</Option>
          <Option value={2}>javascript</Option>
          <Option value={3}>reactJs</Option>
        </Select>
      </div>
    </Modal>
  );
}

export default EditPost;
