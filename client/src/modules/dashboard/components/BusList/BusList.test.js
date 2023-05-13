import {render, screen} from "@testing-library/react";
import BusList from "./Buslist";


describe("Bus list tests", () => {

    fit("Page should be loading before API call", () => {
        render(<BusList />)
        expect(screen.getByText("Loading...")).toBeVisible()
    });

    it("Should call API once, after page has rendered", () => {
        
    })
  
    it("Should show buslines on page", () => {

    })

  });