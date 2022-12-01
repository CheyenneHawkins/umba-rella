import { UserAuth } from "../contexts/AuthContextNew";

export default function Special() {
    const { user } = UserAuth();
    console.log(user)

    if (user) {
        return (
            <>
                <h1>You're special!!</h1>
            </>
        )
    } else {
        return (
            <>
                <h1> Hey now!</h1>
                <p>Gotta login.</p>
            </>
        )
    }

}