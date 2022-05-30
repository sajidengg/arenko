/** * 
* @param Pages imports the ValidateGUI.js page's method
// 1.  Function automatedGU() automated test to validate GUI scenarios
// 2. `describe()`  grouping test cases
// 3. `it()` test case
// 4. `before()`, hook to initialize driver
 //5. `after()`,  hook to close broswer
*/

const Pages = require('../Pages/ValidateGUI_ActiveTab.js');

exports.automatedActiveTab = async function () {
    try {
        describe("Active Tab", async () => {
            before("Open Browser", async () => {
                await Pages.launchBrowser("http://localhost:3000/");
            })

            it("From and To fields can't be empty", async () => {
                await Pages.checkFromAndToCantEmpty();
            })


            it("From and To fields  should be +ve numeric values.", async () => {
                await Pages.checkFromAndToPostiveValue();
            })


            it("Asset drop-down can't be empty.", async () => {
                await Pages.checkAssetDropDownCantEmpty();
            })

            it("Start time should be after the current time.", async () => {
                await Pages.checkStartTime();
            })

            it("To Time should be after the start time.", async () => {
                await Pages.checkEndTime();
            })

            it("Submit Asset", async () => {
                await Pages.clickTOOverRide();
            })

            it("Closed Browser", async () => {

                await Pages.closedBroswer();

            })



        })
    }
    catch (error) {

        console.log("Failed to perfrom Active Tab Task" + error);
    }
}
//automatedActiveTab();