import React, {Component} from 'react';
import {Calendar} from "react-calendar";

class TurnoCalendar extends Component {
    isSameDay = (date1, date2)=>{
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    isWeekEnd=(date)=> {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    disableTilesArray =()=>{
        const disabledDates = [];
        let date = new Date();
        let lastDate = new Date();
        lastDate.setDate(date.getDate() + 30);
        for(; date <= lastDate;date.setDate(date.getDate() + 1)){
            if(this.isWeekEnd(date)){
                disabledDates.push(new Date(date) );
            }
        }
        return disabledDates;
    }

    tileDisable = ({date, view}) =>{
        // Disable tiles in month view only
        let disabledDates = this.disableTilesArray();
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of disabled dates
            return disabledDates.find(dDate => this.isSameDay(dDate, date));
        }
    }
    render() {
        const {
            input: {value, onChange}
        } = this.props;
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return (
            <Calendar
                tileDisabled={this.tileDisable}
                defaultActiveStartDate={new Date()}
                minDate={new Date()}
                maxDate={maxDate}
                maxDetail={'month'}
                minDetail={'month'}
                value={value}
                onChange={onChange}
            />
        );
    }
}

export default TurnoCalendar;