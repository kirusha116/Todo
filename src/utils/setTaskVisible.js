export function setTaskVisible(completed, selectedState) {
    const filter = {
        'ALL': true,
        'CURRENT': !completed,
        'COMPLETED': completed,
    }
    return filter[selectedState]
}