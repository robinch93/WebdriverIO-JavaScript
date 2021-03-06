
const searchPage = require("../flixbus_pages/searchPage")
const codeReedeem = require("../flixbus_pages/codeReedemPage")
const methods = require("../flixbus_test/methods")


describe("Verify Travel Details: ", function(){

    var depCity = "Turin";
    var arrCity = "Rome";
    var travelDate = "2020-06-13";

    it("verify travel details on search page", function(){
        browser.url('https://global.flixbus.com/');
        browser.pause(2000);
        searchPage.handleCookiesBanner();
        searchPage.setDepartureCity(depCity); 
        searchPage.setArrivalCity(arrCity); 
        searchPage.setDepartureDate(travelDate);
        expect(searchPage.getDepartureCity()).to.equal(depCity);
        expect(searchPage.getArrivalCity()).to.equal(arrCity);
        searchPage.clickSearchButton();
    });

    it("verify redirection to code reedem page", function(){ 
        codeReedeem.waitForCodeReedeemToLoad(); 
        var title = codeReedeem.pageTitle();  
        expect(title).to.equal("Travel by bus from " + depCity + " to " + arrCity + " on " + methods.swapDate(travelDate))
    });

    it("verify departure label on code reedem page", function(){ 
        browser.pause(1000);
        var depLabelText = codeReedeem.getDepartureLabel();
        console.log("DepTxt: " + depLabelText);
        assert.equal(depLabelText, "Departure from " + depCity);
    });

    it("verify arrival label on code reedem page", function(){ 
        browser.pause(1000);
        var arrivalText = codeReedeem.getArrivalLabel();
        console.log("ArrTxt: " + arrivalText);
        expect(arrivalText).to.equal("Arrival in " + arrCity);
    });

    it("verify active date on code reedem page", function(){ 
        let activeDate = codeReedeem.getActiveDate();
        let formatedDate = methods.formatDate(travelDate);
        console.log("Active Date: " + activeDate + ": Formated date: " + formatedDate);
        assert.equal(activeDate.replace(/\s/g,''), formatedDate.replace(/\s/g,''));
    });

});

