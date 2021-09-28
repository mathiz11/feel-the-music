import React, { useEffect, useState } from "react"
import Layout from "../components/Layout";
import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import data from "../artist.json"
import { HiBadgeCheck } from "react-icons/hi";
import { BsPersonFill } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Artist() {
    const [artist, setArtist] = useState()
    let { id } = useParams()
    
    useEffect(() => {
        // TODO get artist information
        setArtist(data.artist)
    }, [])

    return (
        <Layout>
            <Container>
                {artist && (
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} my={8}>
                        <Image src={artist.image_url} boxSize={"2xs"} borderRadius={"full"}/>
                        <Flex alignItems={"center"} mt={2}>
                            <Text fontSize={"2xl"} fontWeight={"semibold"}>{artist.name}</Text>
                            {artist.is_verified && <Icon as={HiBadgeCheck} color={"#2A6CB0"} boxSize={5} ml={1}/>}
                        </Flex>
                        <Flex alignItems={"center"} mt={2}>
                            <Icon as={BsPersonFill} mr={1}/>
                            <Text fontWeight={"semibold"}>{artist.followers_count}</Text>
                        </Flex>
                        <Flex alignItems={"center"}>
                            {artist.facebook_name && <Button colorScheme={"facebook"} leftIcon={<FaFacebookF/>}> {
                                artist
                                    .facebook_name
                            }</Button>}
                            {artist.twitter_name &&
                            <Button colorScheme={"twitter"} leftIcon={<FaTwitter/>}>{artist.twitter_name}</Button>}
                            {artist.instagram_name &&
                            <Button leftIcon={<FaInstagram/>}>{artist.instagram_name}</Button>}
                        </Flex>
                        <div dangerouslySetInnerHTML={{ __html: artist.description.html }}/>
                        <Heading>Musiques récentes</Heading>
                    </Box>
                )}
            </Container>
        </Layout>
    )
}