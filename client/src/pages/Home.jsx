import React, { useEffect, useState } from "react"
import Layout from "../components/Layout";
import {
    Avatar,
    Badge,
    Box,
    Container,
    Divider,
    Flex,
    IconButton,
    Image,
    Input,
    SlideFade,
    Text,
    useToast
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsEye, BsSearch } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ACTIONS, useStore } from "../components/Store";
import apiService from "../services/apiService";

export default function Home() {
    const [searchValue, setSearchValue] = useState()
    const [loading, setLoading] = useState(false)
    const [hits, setHits] = useState([])
    const toast = useToast()
    const { state, dispatch } = useStore()

    useEffect(() => {
        if (!state.bearerToken) {
            apiService.authenticate()
                .then(response => {
                    dispatch({ type: ACTIONS.SET_TOKEN, payload: { token: response.data["access_token"] } })
                })
                .catch(() => {
                    toast({
                        title: "Échec de l'authentification",
                        status: "error",
                        duration: 5000,
                        isClosable: true
                    })
                })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleSearch() {
        setLoading(true);
        apiService.search(state.bearerToken, searchValue)
            .then(response => {
                setHits(response.data)
                setLoading(false)
            })
            .catch(() => {
                toast({
                    description: "Échec de la recherche",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
                setLoading(false)
            })
    }

    function formatViews(views) {
        if (views < 1000) {
            return views
        } else if (views < 1000000) {
            return (views / 1000).toFixed(1) + "K"
        } else {
            return (views / 1000000).toFixed(1) + "M"
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <Layout>
            <Container my={8}>
                <Flex>
                    <Input placeholder={"Musique, Artiste, Paroles..."} value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>
                    <IconButton isLoading={loading} ml={3} aria-label={"Rechercher"} colorScheme={"blue"}
                                icon={<BsSearch/>}
                                onClick={handleSearch}/>
                </Flex>
                <SlideFade in={hits.length > 0} offsetY={"20px"}>
                    {hits.map((hit, i) => (
                        <Link key={hit.id} to={`/song/${hit.id}`}>
                            <Box py={5} display={"flex"} flexDirection={"column"}
                                 alignItems={"center"}>
                                <Image src={hit.imageUrl}/>
                                <Box display={"flex"} flexDirection={"column"} py={5}>
                                    {hit.top && (
                                        <Flex justifyContent={"center"}>
                                            <Badge textAlign={"center"} borderRadius={"full"} px={2}>TOP</Badge>
                                        </Flex>
                                    )}
                                    <Text fontSize={"xl"} fontWeight={"semibold"}
                                          textAlign={"center"} my={2}>{hit.title}</Text>
                                    <Flex alignItems={"center"}>
                                        <Avatar size={"sm"} name={hit.artist.name}
                                                src={hit.artist.imageUrl} mr={1}/>
                                        <Text mx={1}>{hit.artist.name}</Text>
                                        {hit.artist.isVerified && <HiBadgeCheck color={"#2A6CB0"}/>}
                                        <Box ml={1}>
                                            <Link
                                                to={`/artist/${hit.artist.id}`}><BsBoxArrowUpRight/></Link>
                                        </Box>
                                    </Flex>
                                    <Flex alignItems={"center"} justifyContent={"center"} mt={2}>
                                        <BsEye/>
                                        <Text fontSize={"xs"} fontWeight={"semibold"}
                                              letterSpacing={"wide"}
                                              ml={1}>{formatViews(hit.statsPageView)}</Text>
                                    </Flex>
                                </Box>
                            </Box>
                            {i < 9 && <Divider/>}
                        </Link>
                    ))}
                </SlideFade>
            </Container>
        </Layout>
    )
}