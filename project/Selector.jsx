
export default function Selector({ propsForSelector }) {

    const { selectedState, setSelectedState } = propsForSelector

    const states = {
        ALL: 'All',
        CURRENT: 'Current',
        COMPLETED: 'Completed',
    }

    return (
        <select className={'nav__select'} value={selectedState} onChange={(e) => {
            setSelectedState(e.target.value)
        }}>
            {Object.entries(states).map(([key, value]) => <option
                key={key}
                value={key}
            >{value}
            </option>)}
        </select>
    )
}