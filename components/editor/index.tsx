import dynamic from "next/dynamic";
const Editor = dynamic(() =>
  import("react-draft-wysiwyg").then((mod) => mod.Editor)
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface EditorProps {
  editorState: any;
  onEditorStateChange: (value: any) => void;
}

function Editors(props: EditorProps) {
  const { editorState, onEditorStateChange } = props;

  return (
    <Editor
      editorState={editorState || ""}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
}

export default Editors;
