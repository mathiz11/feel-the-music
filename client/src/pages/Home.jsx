import React, {useState} from "react"
import Layout from "../components/Layout";
import {Button, Container, Flex, Input} from "@chakra-ui/react";
import {BsSearch} from "react-icons/all";

export default function Home() {
    const [searchValue, setSearchValue] = useState("")
    return (
        <Layout>
            <Container my={"2rem"}>
                <Flex>
                    <Input placeholder={"Musique, Artiste, Paroles..."} value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)} mr={"2rem"}/>
                    <div>
                        <Button colorScheme={"blue"} leftIcon={<BsSearch/>}>Rechercher</Button>
                    </div>
                </Flex>
            </Container>
        </Layout>
    )
}