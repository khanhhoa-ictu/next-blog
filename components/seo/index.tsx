import Head from "next/head";
import { ISeo } from "../../types/seo";

interface SeoProps {
  data: ISeo;
}
function Seo({ data }: SeoProps) {
  const { title, url, thumbnail, description } = data;
  return (
    <Head>
      <title>ReactJs blog | Smile123</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={thumbnail} />
    </Head>
  );
}

export default Seo;
