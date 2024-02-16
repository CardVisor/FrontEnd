import React, { Component } from 'react';
import MonthBox from './MonthBox';
import Picker from 'react-month-picker';
class MonthPickingComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            singleValue2: { year: 2016, month: 7 },
        };

        this.pickAMonth = React.createRef();
        this.pickAMonth2 = React.createRef();
        this.pickMulti = React.createRef();
        this.pickRange = React.createRef();
        this.pickRange2 = React.createRef();
    }

    render() {
        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From',
            to: 'To',
        };
        const { singleValue, singleValue2, multiValue, rangeValue, rangeValue2 } = this.state;

        const makeText = (m) => {
            if (m && m.year && m.month) return pickerLang.months[m.month - 1] + '. ' + m.year;
            return '?';
        };

        return (
            <ul>
                <li>
                    <label>
                        <b>Pick A Month</b>
                        <span>(Available months from Feb.2016 to Sep.2016)</span>
                    </label>
                    <div className="edit">
                        <Picker
                            ref={this.pickAMonth2}
                            years={{ min: { year: 2022, month: 1 }, max: { year: 2024, month: 2 } }}
                            value={singleValue2}
                            lang={pickerLang.months}
                            theme="dark"
                            onChange={this.handleAMonthChange2}
                            onDismiss={this.handleAMonthDissmis2}
                        >
                            <MonthBox value={makeText(singleValue2)} onClick={this.handleClickMonthBox2} />
                        </Picker>
                    </div>
                </li>
            </ul>
        );
    }
}

export default MonthPickingComponent;
