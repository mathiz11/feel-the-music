import React from 'react'
import './styles/App.css'
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import { StoreProvider } from "./components/Store";
import Artist from "./pages/Artist";

function App() {
    return (
        <ChakraProvider>
            <StoreProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact component={Home}/>
                        <Route path={"/artist/:id"} exact component={Artist}/>
                    </Switch>
                </BrowserRouter>
            </StoreProvider>
        </ChakraProvider>
    );
}

export default App;
