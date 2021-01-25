export const getHeaders = (state) => {
    let headers = {
        'Content-Type': 'application/ld+json',
    }
    if (localStorage.getItem('token'))
        headers = {
            ...headers,
            'Php-Auth-Digest': `Bearer ${localStorage.getItem('token')}`
        }
    console.log(headers);
    return new Headers(headers)
}

export const decodeLastPage = (page = "") => {
    let sol = "";
    for(let i = page.length - 1; page[i] !== '='; i--){
        sol += page[i];
    }

    var splitString = sol.split("");
    var reverseArray = splitString.reverse();

    return parseInt( reverseArray.join(""));
}

export const changePageNumberFromURL = (page, newValue) =>{
    let i = page.length;
    while(page[i] !== '=')
        i--;

    i++;
    let sol = page.slice(0, i);
    return sol + newValue;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export const getHoursFromDate = (date) =>{
    let h = date.getHours();
    let m = date.getMinutes();

    return addZero(h) + ':' + addZero(m);
}

export const getFormatedDate = (date) =>{
    let m = date.getMonth() + 1;
    if(m < 10)
        m = '0'+ m;
    let dateString = "";
    dateString = dateString + date.getFullYear() + '-' + m + '-' + date.getDate();
    return dateString;
}

export const addDays = (date, amountOfDays) => {
    return date.setSeconds(amountOfDays * 86400);
}

// Parse an ISO date string (i.e. "2019-01-18T00:00:00.000Z",
// "2019-01-17T17:00:00.000-07:00", or "2019-01-18T07:00:00.000+07:00",
// which are the same time) and return a JavaScript Date object with the
// value represented by the string.
export const isoStringToDate = ( isoString ) => {

    // Split the string into an array based on the digit groups.
    var dateParts = isoString.split( /\D+/ );

    // Set up a date object with the current time.
    var returnDate = new Date();

    // Manually parse the parts of the string and set each part for the
    // date. Note: Using the UTC versions of these functions is necessary
    // because we're manually adjusting for time zones stored in the
    // string.
    returnDate.setUTCFullYear( parseInt( dateParts[ 0 ] ) );

    // The month numbers are one "off" from what normal humans would expect
    // because January == 0.
    returnDate.setUTCMonth( parseInt( dateParts[ 1 ] - 1 ) );
    returnDate.setUTCDate( parseInt( dateParts[ 2 ] ) );

    // Set the time parts of the date object.
    returnDate.setUTCHours( parseInt( dateParts[ 3 ] ) );
    returnDate.setUTCMinutes( parseInt( dateParts[ 4 ] ) );
    returnDate.setUTCSeconds( parseInt( dateParts[ 5 ] ) );
    returnDate.setUTCMilliseconds( parseInt( dateParts[ 6 ] ) );

    // Track the number of hours we need to adjust the date by based
    // on the timezone.
    var timezoneOffsetHours = 0;

    // If there's a value for either the hours or minutes offset.
    if ( dateParts[ 7 ] || dateParts[ 8 ] ) {

        // Track the number of minutes we need to adjust the date by
        // based on the timezone.
        var timezoneOffsetMinutes = 0;

        // If there's a value for the minutes offset.
        if ( dateParts[ 8 ] ) {

            // Convert the minutes value into an hours value.
            timezoneOffsetMinutes = parseInt( dateParts[ 8 ] ) / 60;
        }

        // Add the hours and minutes values to get the total offset in
        // hours.
        timezoneOffsetHours = parseInt( dateParts[ 7 ] ) + timezoneOffsetMinutes;

        // If the sign for the timezone is a plus to indicate the
        // timezone is ahead of UTC time.
        if ( isoString.substr( -6, 1 ) === "+" ) {

            // Make the offset negative since the hours will need to be
            // subtracted from the date.
            timezoneOffsetHours *= -1;
        }
    }

    // Get the current hours for the date and add the offset to get the
    // correct time adjusted for timezone.
    returnDate.setHours( returnDate.getHours() + timezoneOffsetHours );

    // Return the Date object calculated from the string.
    return returnDate;
}

export const changeTimeZone = (date, ianatz) =>{
    var invdate = new Date(date.toLocaleString('en-US',{
        timeZone: ianatz
    }));

    var diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() - diff);
}

export const getIdFromUrl = (url) =>{
    let array = url.split("/");

    return array[array.length - 1];
}

Date.prototype.toIsoStringMine = function() {
    var tzo = -this.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}