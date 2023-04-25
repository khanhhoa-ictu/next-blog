import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { getAbout } from "../../api-client/about";
import Loading from "../../components/loading";
import Particle from "../../components/particle";
import React from "react";
import { useQuery } from "react-query";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
function AboutMe() {
  const { data, isFetching } = useQuery("aboutMe", () => getAbout());
  if (isFetching) {
    return <Loading />;
  }
  return (
    <>
      <Particle />
      <div className={styles.container}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.thumb}>
              <Image src={data?.thumbnail} alt="" width={370} height={500} />
            </div>
            <div className={styles.textContent}>
              <h3>{data?.title}</h3>
              <div className={styles.aboutBio}>
                <p>{data?.content}</p>
              </div>

              <ul className={styles.aboutSocial}>
                <li>
                  <Link href={{ pathname: data.facebook }} target={"_blank"}>
                    <FacebookOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: data.instal }} target={"_blank"}>
                    <InstagramOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: data.youtube }} target={"_blank"}>
                    <YoutubeOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: data.linkedin }} target={"_blank"}>
                    <LinkedinOutlined />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutMe;
