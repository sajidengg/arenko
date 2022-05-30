/** * 
* @param Pages imports the ValidateAPI.js page's method
// 1. Function automatedGU() automated test to validate GUI scenarios
// 2. `describe()`  grouping test cases
// 3. `it()` test case
// 4. `before()`, hook to initialize driver
 //5. `after()`,  hook to close broswer
*/
const Pages = require('../Pages/ValidateAPI.js');
exports.AutomatedAPI = async function () {
    try {
        describe("Write a suite of HTTP API tests in which each case sends a specific request and expects specific responses, status codes etc", async () => {

            it("GET /intensity", async () => {
                await Pages.getIntenSity();
            })

            it("GET /intensity/date", async () => {
                await Pages.getIntenSityDate();
            })

            it("GET /intensity/date/{date}", async () => {
                await Pages.getIntenSityDateWithParameters();
            })
            it("Closed Browser", async () => {

                await Pages.closedBroswer();

            })

        })
    }
    catch (error) {
        console.log(("Error in spec file:" + error))
    }
}

