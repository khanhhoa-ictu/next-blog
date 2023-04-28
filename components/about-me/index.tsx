import TextArea from "antd/lib/input/TextArea";
import React from "react";
import styles from "./style.module.scss";
interface AboutMeProps {
  aboutMe?: string;
  changeAbout: (value: string) => void;
}
function AboutMe(props: AboutMeProps) {
  const { aboutMe, changeAbout } = props;
  const handleChangeAbout = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeAbout(value.target.value);
  };
  return (
    <div>
      <TextArea
        className={styles.textArea}
        defaultValue={aboutMe}
        onChange={handleChangeAbout}
      />
    </div>
  );
}

export default AboutMe;
