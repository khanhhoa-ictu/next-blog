import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import dynamic from "next/dynamic";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";
interface AddPostProps {
  isModalVisible: boolean;
  handleOk: (data: IPost) => void;
  handleCancel: () => void;
}
const { Option } = Select;
function AddPost(props: AddPostProps) {
  const TextEditor = dynamic(() => import("components/text-editor"), {
    ssr: false,
  });
  const [form] = useForm();
  const { isModalVisible, handleOk, handleCancel } = props;
  const onChangeEditor = (event: any, editor: any) => {
    const data = editor.getData();
    form.setFieldsValue({
      content: data,
    });
  };
  const handleCancelModal = () => {
    handleCancel();
  };
  const handleSubmit = (payload: any) => {
    handleOk(payload);
  };

  return (
    <Modal
      title="Add post"
      visible={isModalVisible}
      onOk={() => form.submit()}
      onCancel={handleCancelModal}
      wrapClassName={styles.wrapperModal}
    >
      <Form form={form} onFinish={handleSubmit}>
        <div className={styles.fromItem}>
          <label>tiêu đề</label>
          <Form.Item name="title">
            <Input />
          </Form.Item>
        </div>
        <div className={styles.fromItem}>
          <label>Nội dung bài viết</label>
          <Form.Item name="content">
            <TextEditor onChange={onChangeEditor} />
          </Form.Item>
        </div>
        <div className={styles.fromItem}>
          <label>Nội dung tóm tắt</label>
          <Form.Item name="summary">
            <TextArea />
          </Form.Item>
        </div>
        <div className={styles.fromItem}>
          <label>thumbnail</label>
          <Form.Item name="thumbnail">
            <Input type="text" />
          </Form.Item>
        </div>
        <div className={styles.fromItem}>
          <label>thể loại</label>
          <Form.Item name="category_id">
            <Select>
              <Option value={1}>html-css</Option>
              <Option value={2}>javascript</Option>
              <Option value={3}>reactJs</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default AddPost;
