import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import HotlistEntry from "./HotlistEntry";

describe("Hotlist Entry Test", () => {
    describe("when hotlist entry is displayed", () => {
        const entry =
        {
            "stockSymbol": "TSLA",
            "usersOwning": 10,
            "stockName": "Tesla Inc"
        };

        it("should render the correct user owned", () => {
            render(
                <HotlistEntry entry={entry} />
            );
            const test = screen.getByText("10");
            expect(test).not.toBeNull();
        });

        it("should render the correct symbol", () => {
            render(
                <HotlistEntry entry={entry} />
            );
            const test = screen.getByText("TSLA");
            expect(test).not.toBeNull();
        });

        it("should render the full company name if it's short enough", () => {
            render(
                <HotlistEntry entry={entry} />
            );
            const test = screen.getByText("Tesla Inc");
            expect(test).not.toBeNull();
        });

        it("should render shortened company name if it's long enough", () => {
            const entry =
            {
                "stockSymbol": "TXN",
                "usersOwning": 10,
                "stockName": "Texas Instruments"
            };

            render(
                <HotlistEntry entry={entry} />
            );
            const test = screen.getByText("Texas Instrumen...");
            expect(test).not.toBeNull();
        });
    });
});