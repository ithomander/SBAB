import {render, screen} from "@testing-library/react";
import BusList from "./Buslist";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockBusLines = [
  {
    line: "1",
    busStops: ["Norrtälje busstation", "Älmsta busstation", "Harnäset", "Sjöängen", "Skeppsmyra affär", "Skeppsmyra by", "Skeppsmyra östra"]
  }, 
  {
    line: "2",
    busStops: ["Danderyds sjukhus", "Roslags Näsby trafikplats", "Åkersberga stationt", "Arninge station", "Ekebo", "Tallebo", "Singö handel"]
  }
]

// Setting up mock service worker to intercept HTTP requests
const server = setupServer(rest.get("/api", (req, res, ctx) => {
    return res(
        ctx.json(mockBusLines)
    )
}));

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("The bus list", () => {
    
    it("should display loading at initial render", () => {
      render(<BusList />);
      expect(screen.getByText("Loading...")).toBeVisible()
    })

    it("should display the line number in accordian", async () => {
        render(<BusList />);
        expect(await screen.findByText("Bus line number 1")).toBeVisible();
    })

});