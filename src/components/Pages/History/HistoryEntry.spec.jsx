import { render, screen } from "@testing-library/react";
import HistoryEntry from "./HistoryEntry";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

describe("History Entry Test", () => {
    describe("when history entry is displayed", () => {
        it("should render SELL icon if entry represents a sale", () => {
            const entry =
            {
                "userId": 1,
                "symbol": "GSK",
                "companyName": "Glaxosmithkline",
                "action": "SELL",
                "shares": 2,
                "price": 46,
                "date": 1650284767217
            };

            render(
                <HistoryEntry entry={entry} />
            );
            const test = screen.getByTestId("RemoveCircleOutlineIcon");
            expect(test).not.toBeNull();
        });

        it("should render BUY icon if entry represents a purchase", () => {
            const entry =
            {
                "userId": 1,
                "symbol": "GSK",
                "companyName": "Glaxosmithkline",
                "action": "BUY",
                "shares": 2,
                "price": 46,
                "date": 1650284767217
            };

            render(
                <HistoryEntry entry={entry} />
            );
            const test = screen.getByTestId("AddCircleOutlineIcon");
            expect(test).not.toBeNull();
        });

        it("should render ACCOUNT icon if entry represents an account action", () => {
            const entry =
            {
                "userId": 1,
                "symbol": null,
                "companyName": null,
                "action": "ADD",
                "shares": null,
                "price": 46,
                "date": 1650284767217
            };

            render(
                <HistoryEntry entry={entry} />
            );
            const test = screen.getByTestId("AccountBalanceIcon");
            expect(test).not.toBeNull();
        });
    });
});