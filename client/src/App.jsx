import React from 'react'
import './styles/App.css'
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import { StoreProvider } from "./components/Store";
import Artist from "./pages/Artist";
import Song from "./pages/Song";

function App() {
    return (
        <ChakraProvider>
            <StoreProvider>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact component={Home}/>
                        <Route path={"/artist/:id"} exact component={Artist}/>
                        <Route path={"/song/:id"} exact component={Song}/>
                    </Switch>
                </BrowserRouter>
            </StoreProvider>
        </ChakraProvider>
    );
}

export default App;
