/** 
 * 1. @param {Builder, By, Key, until}  are  objects  of selenium webdriver
 * 2. @param {chrome} It imports chrome library
 * 3. function launchBrowser()  To open a broswer
 * 4. function sendata() To send data 
 * 5. function click()  To click on element
 * 6. function closedBroswer()  To close a broswer
 * 8. function getTextOfElement() To get text of any element
 */

let fetch = require('node-fetch');
require('chromedriver');
let { Builder, By, Key, until } = require('selenium-webdriver');
let chrome = require('../../node_modules/selenium-webdriver/chrome');
const { performance } = require('perf_hooks');
let driver, options;
class Generic {

    async getData(url) {
        let collection, lastResponse, status, responseTime;

        try {
            let time1 = performance.now();
            lastResponse = await fetch(url, {
                method: "GET"
            }).then(async function (response) {
                let time2 = performance.now();
                let time3 = time2 - time1;
                responseTime = time3 / 1000;
                //  console.log("response time of  GET /intensity API" + responseTime);
                status = response.status;
                return response.json().then(async function (jsonResponse) {
                    collection = await jsonResponse;

                    let checkError = await JSON.stringify(collection)
                    if (checkError.includes("error")) {
                        status = await collection.error.code;
                        status = await parseInt(status.match(/\d+/), 10);
                    }


                });
            });
            return [status, collection, responseTime];
        } catch (err) {
            throw err;
        }
    }



    async launchBrowser(url) {
        try {

            options = new chrome.Options();
            options.addArguments("--start-maximized");
            options.addArguments("--test-type");
            options.addArguments("disable-infobars");
            driver = await new Builder().forBrowser("chrome").withCapabilities(options).build();
            await driver.manage().window().maximize();
            await driver.get(url)

        }
        catch (error) {
            console.log("Failed to open browser: " + error);

        }

    }
    async click(XPathOfElement) {
        try {
            await driver.wait(until.elementLocated(By.xpath(XPathOfElement)), 5000);
            await driver.findElement(By.xpath(XPathOfElement)).click();
        }
        catch (error) {
            console.log("Failed to clcik on element: " + error);
        }

    }
    async waitForWhile() {
        try {
            await driver.sleep(4000);

        }
        catch (error) {

            console.log("Failed to wait element: " + error)
        }
    }

    async hoverElement(XPathOfElement) {
        try {
            await driver.wait(until.elementLocated(By.xpath(XPathOfElement)), 5000);
            const actions = driver.actions({ bridge: true });
            driver.findElement(By.xpath(XPathOfElement)).then((elem) => {
                actions.move({ duration: 5000, origin: elem, x: 0, y: 0 }).perform();
            });

        }
        catch (error) {
            console.log("Failed to Hover on element: " + error);
        }

    }
    async getTextOfElement(XPathOfElement) {
        try {
            return await driver.findElement(By.xpath(XPathOfElement)).getText();
        }
        catch (error) {
            console.log(error)

        }
    }

    async getAttributeValue(XPathOfElement) {
        try {
            return await driver.findElement(By.xpath(XPathOfElement)).getAttribute("value");
        }
        catch (error) {
            console.log("failed to get attribute value:" + error)
        }
    }

    async clearText(XPathOfElement) {
        try {

            for (let i = 1; i <= 4; i++) {
                await driver.findElement(By.xpath(XPathOfElement)).sendKeys(Key.BACK_SPACE);
            }

        }
        catch (error) {
            console.log("Failed to clear Text:" + error);

        }
    }
ß
    async moverCursor(lengthOfString, XPathOfElement) {
        try {
            const actions = driver.actions({ async: true });
            await actions.move({ y: parseInt(lengthOfString) }).pause(3000).perform();
            for (let i = 1; i <= 4; i++) {
                await driver.findElement(By.xpath(XPathOfElement)).sendKeys(Key.BACK_SPACE);
            }
        }
        catch (error) {
            console.log("Failed to move cursor:" + error)

        }
    }

    async sendData(XPathOfElement, Data) {
        try {
            await driver.wait(until.elementLocated(By.xpath(XPathOfElement)), 5000);
            await driver.findElement(By.xpath(XPathOfElement)).sendKeys(Data)
        }
        catch (error) {
            console.log("Failed to enter Data:" + Data)
        }
    }
    async closedBroswer() {
        try {
            await driver.quit();
        }
        catch (error) {
            console.log("Failed to closed server: " + error)
        }
    }


}

module.exports = Generic;