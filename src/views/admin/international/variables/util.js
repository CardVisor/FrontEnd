//numberWithDots
export const numberWithDots = function (p_value) {
    p_value = p_value + '';
    p_value = parseInt(p_value.replace(/[^0-9]/gm, ''), 10);
   
    return p_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');   
};

export const parseNumber = function(p_value) {
    p_value = p_value + '';
    return parseInt(p_value.replace(/[^0-9]/gm, ''), 10);
};


// moneyFormat
const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

const numberFormat = (value) => {
    return value.toString().replace(NUMBER_FORMAT_REGX, ',');
}

const numbering = (value, division) => {
    const result = Math.floor(value / division);
    return result === 0 ? null : (result % division);
}

const setUnitText = (numbers) => {
    const unit = ['원', '만', '억', '조', '경'];
    return numbers.map((number, index) => !!number ? numberFormat(number) + unit[(unit.length - 1) - index] : number)
}

export const moneyFormat = (value) => {
    const numbers = [
        numbering(value % 100000000000000000000, 10000000000000000),
        numbering(value % 10000000000000000, 1000000000000),
        numbering(value % 1000000000000, 100000000),
        numbering(value % 100000000, 10000),
        //value % 10000
    ]

    return setUnitText(numbers)
            .filter(number => !!number)
            .join(' ');
};
// end moneyFormat

// moneyFormat2
const options2 = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
};

const numberFormat2 = new Intl.NumberFormat("en-US", options2);

export const formatabroad = (number) => {
    if (number < 0) {
        number = Math.abs(number);
        if (number >= 100000000) {
            return `-${numberFormat2.format(
                (number / 100000000).toFixed(2)
            )} billion`;
        } else if (number >= 1000000) {
            return `-${numberFormat2.format(
                (number / 1000000).toFixed(2)
            )} million`;
        } else if (number >= 10000) {
            return `-${numberFormat2.format(
                (number / 1000).toFixed(2)
            )} thousand`;
        } else {
            return `-${numberFormat2.format(number.toString())}`;
        }
    } else {
        if (number >= 100000000) {
            return `${numberFormat2.format(
                (number / 100000000).toFixed(2)
            )} billion`;
        } else if (number >= 1000000) {
            return `${numberFormat2.format(
                (number / 1000000).toFixed(2)
            )} million`;
        } else if (number >= 10000) {
            return `${numberFormat2.format(
                (number / 1000).toFixed(2)
            )} thousand`;
        } else {
            return numberFormat2.format(number.toString());
        }
    }
};

export const formatNumber = (number) => {
    if (number < 0) {
        number = Math.abs(number);
        if (number >= 100000000) {
            return `-${(number / 100000000).toFixed(2)} 억`;
        } else if (number >= 1000000) {
            return `-${(number / 1000000).toFixed(2)} 백만`;
        } else if (number >= 10000) {
            return `-${(number / 10000).toFixed(2)} 만`;
        } else {
            return `-${number.toString()}`;
        }
    } else {
        if (number >= 100000000) {
            return `${(number / 100000000).toFixed(2)} 억`;
        } else if (number >= 1000000) {
            return `${(number / 1000000).toFixed(2)} 백만`;
        } else if (number >= 10000) {
            return `${(number / 10000).toFixed(2)} 만`;
        } else {
            return number;
        }
    }
};
// end moneyFormat2
