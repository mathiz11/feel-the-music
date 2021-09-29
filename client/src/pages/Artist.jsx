import React, { useEffect, useState } from "react"
import Layout from "../components/Layout";
import { Box, Center, Container, Flex, Heading, Icon, Image, Link, Spinner, Text, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import { HiBadgeCheck } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import apiService from "../services/apiService";
import { useStore } from "../components/Store";

export default function Artist() {
    const [artist, setArtist] = useState()
    let { id } = useParams()
    const { state } = useStore()
    const toast = useToast()

    useEffect(() => {
        apiService.getArtistById(state.bearerToken, id)
            .then(result => {
                setArtist(result.data)
            })
            .catch(() => {
                toast({
                    title: "Échec de la récupération de l'artiste",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Layout>
            <Container my={8}>
                {artist ? (
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                        <Image src={artist.imageUrl} boxSize={"2xs"} borderRadius={"full"}/>
                        <Flex alignItems={"center"} mt={2}>
                            <Text fontSize={"2xl"} fontWeight={"semibold"}>{artist.name}</Text>
                            {artist.isVerified && <Icon as={HiBadgeCheck} color={"#2A6CB0"} boxSize={5} ml={1}/>}
                        </Flex>
                        <Flex alignItems={"center"} mt={2}>
                            <Icon as={BsPersonFill} mr={1}/>
                            <Text fontWeight={"semibold"}>{artist.followers}</Text>
                        </Flex>
                        <Flex w={"60%"} justifyContent={"space-around"} pt={5} pb={8}>
                            {artist.facebook && (
                                <Link background={"#1877F2"} py={3} px={4} color={"white"} borderRadius={"full"}
                                      isExternal
                                      href={`https://www.facebook.com/${artist.facebook}`}>
                                    <Icon as={FaFacebookF}/>
                                </Link>
                            )}
                            {artist.twitter && (
                                <Link background={"#1D9BF0"} py={3} px={4} color={"white"} borderRadius={"full"}
                                      isExternal
                                      href={`https://twitter.com/${artist.twitter}`}>
                                    <Icon as={FaTwitter}/>
                                </Link>
                            )}
                            {artist.instagram && (
                                <Link background={"#ED4A65"} py={3} px={4} color={"white"} borderRadius={"full"}
                                      isExternal
                                      href={`https://instagram.com/${artist.instagram}`}>
                                    <Icon as={FaInstagram}/>
                                </Link>
                            )}
                        </Flex>
                        <div dangerouslySetInnerHTML={{ __html: artist.description }}/>
                        <Heading mb={5} mt={10}>Musiques récentes</Heading>
                        <Box display={"flex"} flexDirection={"column"}>
                            {artist.recentSongs.map(song => (
                                <Link href={"/song/" + song.id} my={4} display={"flex"}
                                      style={{ textDecoration: 'none' }} flexDirection={"column"}
                                      key={`song${song.id}`}>
                                    <Image src={song.imageUrl}/>
                                    <Text fontSize={"xl"} fontWeight={"semibold"}
                                          textAlign={"center"} my={2}>{song.title}</Text>
                                </Link>
                            ))}
                        </Box>
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