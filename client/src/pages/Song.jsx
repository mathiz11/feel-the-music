import React, { useEffect, useState } from "react"
import Layout from "../components/Layout";
import { Avatar, Box, Center, Container, Flex, Image, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import { useStore } from "../components/Store";
import apiService from "../services/apiService";
import { useParams } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function Song() {
    const [song, setSong] = useState()
    const { state } = useStore()
    let { id } = useParams()
    const toast = useToast()

    useEffect(() => {
        apiService.getSongById(state.bearerToken, id)
            .then(result => {
                setSong(result.data)
            })
            .catch(() => {
                toast({
                    title: "Échec de la récupération de la musique",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Layout>
            <Container my={8}>
                {song ? (
                    <Box display={"flex"} flexDirection={"column"}>
                        <Image src={song.imageUrl}/>
                        <Text fontSize={"3xl"} fontWeight={"semibold"} textAlign={"center"} pt={8}
                              as={"h1"}>{song.title}</Text>
                        <Text fontSize={"xl"} textAlign={"center"} as={"h2"}
                              fontStyle={"italic"}>{song.album.name}</Text>
                        <Center mt={3} mb={8}>
                            <Flex alignItems={"center"}>
                                <Avatar src={song.artist.imageUrl} mr={3}/>
                                <Text>{song.artist.name}</Text>
                            </Flex>
                        </Center>
                        <div dangerouslySetInnerHTML={{ __html: song.description }}/>
                        <Center mt={8}>
                            <Link isExternal href={song.lyricsUrl} display={"flex"} alignItems={"center"}
                                  background={"#2B6CB0"} py={2} px={4} borderRadius={4} color={"white"}
                                  style={{ textDecoration: "none" }}>
                                <Text mr={2}>Voir les lyrics</Text>
                                <BsBoxArrowUpRight/>
                            </Link>
                        </Center>
                    </Box>
                ) : (
                    <Center>
                        <Spinner
                            textAlign={"center"}
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Center>
                )}
            </Container>
        </Layout>
    )
}