import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Quote from "./Quote";

describe("Quote Test", () => {
    describe("when quote is displayed", () => {
        const user = null;
        const capital = null;
        const networth = null;
        const portfolio = null;

        it("should render Arrow Down icon if change is negative", () => {
            const quote = {
                "change": -0.34,
                "changePercent": -0.00206,
                "companyName": "Apple Inc",
                "symbol": "AAPL",
                "latestPrice": 164.95,
            }

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByTestId("ArrowDownwardIcon");
            expect(test).not.toBeNull();
        });

        it("should render Arrow Up icon if change is positive", () => {
            const quote = {
                "change": 0.34,
                "changePercent": 0.00206,
                "companyName": "Apple Inc",
                "symbol": "AAPL",
                "latestPrice": 164.95,
            }

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByTestId("ArrowUpwardIcon");
            expect(test).not.toBeNull();
        });
    })

    describe("when user is logged out", () => {
        const user = null;
        const capital = null;
        const networth = null;
        const portfolio = null;

        const quote = {
            "avgTotalVolume": 8.4321875E7,
            "change": 0.24,
            "changePercent": 0.00145,
            "companyName": "Apple Inc",
            "symbol": "AAPL",
            "currency": "USD",
            "latestPrice": 165.53,
            "week52High": 182.71,
            "week52Low": 121.73
        }

        it("should NOT render Buy button", () => {
            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.queryAllByText("Buy");
            expect(test).toStrictEqual([]);
        });

        it("should NOT render Sell button", () => {
            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.queryAllByText("Sell");
            expect(test).toStrictEqual([]);
        });
    });

    describe("when user is logged in", () => {
        const user = {
            username: "Ivan",
            displayName: "Ivan",
        }
        const capital = 99.99;
        const networth = 199.99;
        const portfolio = [
            {
                "stock": {
                    "symbol": "AAPL",
                    "name": "Apple",
                    "price": 165.46,
                    "lastUpdate": 1650291568800
                },
                "shares": 2,
                "currentReturn": 330.92,
                "totalCost": -340.8
            },
        ];

        const quote = {
            "change": 0.24,
            "changePercent": 0.00145,
            "companyName": "Apple Inc",
            "symbol": "AAPL",
            "latestPrice": 165.53,
        }

        it("should render Buy button", () => {
            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Buy");
            expect(test).not.toBeNull();
        });

        it("should render Sell button", () => {
            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Sell");
            expect(test).not.toBeNull();
        });

        it("should disable Sell button if no shares are owned", () => {
            const portfolio = [];

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Sell").closest("button");
            expect(test.disabled).toBeTruthy();
        });

        it("should enable Sell button if some shares are owned", () => {
            const portfolio = [
                {
                    "stock": {
                        "symbol": "AAPL",
                        "name": "Apple",
                        "price": 165.46,
                        "lastUpdate": 1650291568800
                    },
                    "shares": 2,
                    "currentReturn": 330.92,
                    "totalCost": -340.8
                },
            ];

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Sell").closest("button");
            expect(test.disabled).toBeFalsy();
        });

        it("should disable Buy button if capital is too low", () => {
            const capital = 0.0;

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Buy").closest("button");
            expect(test.disabled).toBeTruthy();
        });

        it("should disable Buy button if capital is high enough", () => {
            const capital = 1000.0;

            render(
                <UserContext.Provider value={{
                    user,
                    capital,
                    networth,
                    portfolio
                }}>
                    <Quote quote={quote} />
                </UserContext.Provider>
            );
            const test = screen.getByText("Buy").closest("button");
            expect(test.disabled).toBeFalsy();
        });
    });
});