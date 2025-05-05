
export function Selector({
    selectedState,
    selectState,
    options,
}) {

    return (
        <select className={'nav__select'} value={selectedState} onChange={(e) => { selectState(e.target.value) }}>
            {options.map(({ state, label }) => {                
                return (
                    <option
                        key={state}
                        value={state}
                    >{label}
                    </option>
                )
            })}
        </select>
    )
}