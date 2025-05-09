
export function Selector({
    selectedState,
    selectState,
    options,
    FilterFuncs,
    setFilterFunc,
}) {

    return (
        <select className={'nav__select'} value={selectedState} onChange={(e) => {
            selectState(e.target.value)
            setFilterFunc(() => FilterFuncs[e.target.value])
        }}>
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