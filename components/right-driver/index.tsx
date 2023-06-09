import React from "react";
import styles from "./style.module.scss";

function RightDriver() {
  return (
    <div className={styles.rightDriver}>
      <svg
        preserveAspectRatio="none"
        width="102px"
        height="1080px"
        viewBox="0 0 102 1080"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fillRule="evenodd">
          <g fillRule="nonzero">
            <g transform="translate(51.000000, 540.000000) rotate(90.000000) translate(-51.000000, -540.000000) translate(-489.000000, 489.000000)">
              <g transform="translate(540.000000, 51.000000) rotate(180.000000) translate(-540.000000, -51.000000) ">
                <path
                  d="M0,7.9621684 C164.947265,47.9621684 344.947265,54.6288351 540,27.9621684 C735.052736,1.2955018 915.052736,14.6288351 1080,67.9621684 L1080,102 L0,102 L0,7.9621684 Z"
                  fillOpacity="0.457"
                ></path>
                <path
                  d="M0,37.9621684 C169.028912,88.578393 349.028912,88.578393 540,37.9621684 C730.97109,-12.6540561 910.97109,-12.6540561 1080,37.9621684 L1080,102 L0,102 L0,37.9621684 Z"
                  transform="translate(540.000000, 51.000000) scale(-1, 1) translate(-540.000000, -51.000000) "
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default RightDriver;
