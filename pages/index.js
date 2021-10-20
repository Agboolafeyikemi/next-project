import Head from "next/head";
import Layout, { siteTitle } from "./components/layouts";
import utilStyles from "./styles/utils.module.css";
import Form from "./components/Form";

export default function Home() {
  return (
    // <Layout home >
    //   <Head>
    //     <title>{siteTitle}</title>
    //   </Head>
    //   <section className={utilStyles.headingMd}>
    //     <p>Hello, My Name is Agboola Feyikemi. I am a Frontend Web Engineer experienced in building web technologies. I have over time worked on both fun and challenging projects.</p>
    //     <p>
    //       (This is a sample website - you’ll be building a site like this on{' '}
    //       <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
    //     </p>
    //   </section>
    // </Layout>
    <Form />
  );
}
