import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box padding={10}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button colorScheme="teal" variant="ghost">
        録音
      </Button>
      <Button colorScheme="teal" variant="ghost">
        録音
      </Button>
    </Box>
  );
};

export default Home;
