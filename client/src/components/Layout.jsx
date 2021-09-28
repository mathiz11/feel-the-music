import React from "react"
import {Center, Flex, Text} from "@chakra-ui/react";
import {BsMusicNote} from "react-icons/bs";

export default function Layout({children}) {
    return (
        <>
            <header>
                <Flex bg={"yellow"} px={5} py={5}>
                    <Flex alignItems={"center"}>
                        <BsMusicNote size={20}/>
                        <Text fontSize={"lg"} fontWeight={"semibold"} ml={1}>Feel the music</Text>
                    </Flex>
                </Flex>
            </header>
            {children}
            <footer>
                <Center bg={"yellow"} py={5}>
                    by Alex Broussard, Mehdi Saadi and Mathis Enjolras
                </Center>
            </footer>
        </>
    )
}