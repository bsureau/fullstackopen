import { useDispatch } from "react-redux"
import { filter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    const handleFilter = (event) => {
        dispatch(filter(event.target.value))
    }

    return (
        <div>
            filter <input name="filter" onChange={handleFilter} />
        </div>
    )
}

export default AnecdoteFilter
