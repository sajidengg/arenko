/** * 
* @param Pages imports the ValidateGUI.js page's method
// 1.  Function automatedGU() automated test to validate GUI scenarios
// 2. `describe()`  grouping test cases
// 3. `it()` test case
// 4. `before()`, hook to initialize driver
 //5. `after()`,  hook to close broswer
*/

const Pages = require('../PAGES/ValidateGUI_TomrrowTab.js');

exports.automatedTomorrowTab = async function () {
    try {
        describe("Tomorrow Tab", async () => {
            before("Open Browser", async () => {
                await Pages.launchBrowser("http://localhost:3000/");
            })


            it("click on Tomorrow Tab", async () => {
                await Pages.clickOnTomorrowTab();
            })

            it("Asset drop down can't be empty", async () => {
                await Pages.assetDropDownValidation();
            })

            it("Check that no null values are allowed for the Offer and Bid value.", async () => {
                await Pages.clickOnAddOverRide();
                await Pages.checkNullValueOfOfferAndBid();
            })

            it("Offer Price must be greater than Offer Undo.", async () => {
                await Pages.checkPriceGreaterThenUndo();

            })

            it("Offer Price must be greater than Bid Undo..", async () => {
                await Pages.checkOfferUndoGreaterThanBidPrice();

            })

            it("Offer Undo must be greater than Bid Price.", async () => {
                await Pages.checkOfferPriceGreaterThanBidUndo();

            })


            it("Verify that the single-sided submission is allowed", async () => {
                await Pages.checkSingleSideJourney();
            })

            it("Closed Browser", async () => {

                await Pages.closedBroswer();

            })

        })
    }
    catch (error) {

        console.log("Failed to perfrom TomorrowTab Task" + error);
    }
}
//automatedTomorrowTab();