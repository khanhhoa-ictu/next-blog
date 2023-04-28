import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import styles from "./style.module.scss";
import ClassicExtended from "ckeditor5-build-classic-extended";

interface TextEditorProps {
  onChange: (event: any, editor: any) => void;
  data?: string;
}
function TextEditor({ onChange, data }: TextEditorProps) {
  return (
    <div className={styles.textEditor}>
      <CKEditor
        editor={ClassicExtended}
        config={{
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "fontfamily",
            "fontsize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "-", // break point
            "|",
            "alignment",
            "imageInsert",
            "uploadImage",
            "blockQuote",
            "codeBlock",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
          ],
        }}
        data={data || ""}
        onChange={(event: any, editor: any) => onChange(event, editor)}
      />
    </div>
  );
}

export default TextEditor;
