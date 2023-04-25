import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface EditorProps {
  editorState: any;
  onEditorStateChange: (value: any) => void;
}

function Editors(props: EditorProps) {
  const { editorState, onEditorStateChange } = props;
  const [editor, setEditor] = useState<boolean>(false);
  useEffect(() => {
    setEditor(true);
  });

  return (
    <>
      {editor ? (
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      ) : null}
    </>
  );
}

export default Editors;
