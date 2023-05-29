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
import { handleErrorMessage } from "helper";

function AboutMe({ about }: any) {
  if (!about) {
    return <Loading />;
  }
  return (
    <>
      {/* <Particle /> */}
      <div className={styles.container}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.thumb}>
              <Image src={about?.thumbnail} alt="" width={370} height={500} />
            </div>
            <div className={styles.textContent}>
              <h3>{about?.title}</h3>
              <div className={styles.aboutBio}>
                <p>{about?.content}</p>
              </div>

              <ul className={styles.aboutSocial}>
                <li>
                  <Link href={{ pathname: about.facebook }} target={"_blank"}>
                    <FacebookOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.instal }} target={"_blank"}>
                    <InstagramOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.youtube }} target={"_blank"}>
                    <YoutubeOutlined />
                  </Link>
                </li>
                <li>
                  <Link href={{ pathname: about.linkedin }} target={"_blank"}>
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

export async function getStaticProps() {
  try {
    const about = await getAbout();
    return {
      props: {
        about,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
