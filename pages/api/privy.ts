import axios from "axios"
import { NextApiHandler } from "next"

// In seconds
const CACHE_MAX_AGE = 60 * 60 // 5 minutes

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.query

    try {
        const { data } = await axios
            .post("https://auth.privy.io/api/v1/users", {
                create_embedded_wallet: true,
                linked_accounts: [
                    {
                        address: email,
                        type: "email"
                    }
                ]
            }, {
                headers: {
                    "privy-app-id": "clxuu09lm09xly8o9hillhm1a",
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${process.env.PRIVY_API_SECRET}`,
                }
            })
        res.setHeader("Cache-Control", `public, max-age=0, s-maxage=${CACHE_MAX_AGE}`)
        let linked_accounts = data.linked_accounts
        let wallets = linked_accounts.filter((account: any) => account.type === "wallet")
        let address = wallets[0].address
        return res.json({ address })
    } catch (error: any) {
        console.log("ERROR", error.message)
        if (axios.isAxiosError(error) && error.response?.status === 429) {
            return res.status(429).json({
                error: "Too many requests",
            })
        }

        return res.status(400).json({
            error: error
        })
    }
}

export default handler
