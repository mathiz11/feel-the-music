import React from 'react'
import './styles/App.css'
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home"
import {StoreProvider} from "./components/Store";

function App() {
    return (
        <ChakraProvider>
            <StoreProvider>
                <BrowserRouter>
                    <Route path={"/"} component={Home}/>
                </BrowserRouter>
            </StoreProvider>
        </ChakraProvider>
    );
}

export default App;
