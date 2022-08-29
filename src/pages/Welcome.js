import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const tokenAbbr = `${token.slice(0, 9)}...`

    return (
        <section className="welcome">
            <h1>{user ? `Welcome ${user}!` : 'Welcome!'}</h1>
            <p>Token: {tokenAbbr}</p>
        </section>
    )
}
export default Welcome