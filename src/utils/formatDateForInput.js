export function formatDateForInput(date) {

    function makeStringNumber(number) {
        if (number < 10) { return '0' + number.toString() } else { return number.toString() }
    }

    const stringDate = {
        YYYY: date.getFullYear().toString(),
        MM: makeStringNumber(date.getMonth() + 1),
        DD: makeStringNumber(date.getDate()),
        HH: makeStringNumber(date.getHours()),
        mm: makeStringNumber(date.getMinutes()),
    }

    return [stringDate.YYYY, '-', stringDate.MM, '-', stringDate.DD, 'T', stringDate.HH, ':', stringDate.mm].join('')
}