import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Navbar from "./Navbar";

describe("Navbar Test", () => {
    describe("when user is logged in", () => {
        const user = {
            username: "Ivan",
            displayName: "Ivan",
        }
    
        const capital = 99.99;
        const networth = 199.99;


        it("should render the user's display name", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Hello Ivan!");
            expect(testText).not.toBeNull();
        });

        it("should render the user's available funds", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Funds $99.99");
            expect(testText).not.toBeNull();
        });

        it("should render the user's networth", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Net $199.99");
            expect(testText).not.toBeNull();
        });

        it("should render a Sign Out button", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Sign Out");
            expect(testText).not.toBeNull();
        });
    });

    describe("when user is NOT logged in", () => {
        const user = null;
        const capital = null;
        const networth = null;

        it("should render a Sign In button", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Sign In");
            expect(testText).not.toBeNull();
        });

        it("should render a Sign Up button", () => {
            render(
                <BrowserRouter>
                    <UserContext.Provider value={{
                        user,
                        capital,
                        networth,
                    }}>
                        <Navbar />
                    </UserContext.Provider>
                </BrowserRouter>
            );
            const testText = screen.getByText("Sign Up");
            expect(testText).not.toBeNull();
        });
    });
});