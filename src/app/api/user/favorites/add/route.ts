// add.ts api/user/favorites/add
import { NextResponse } from 'next/server'
// to-do: interfaces with controller alias instead of model (link to ticket)
import { addToFavorites } from "@controller"

const handler = async (req, res) => {
	const body = await req.json()
	console.log({ req, res })
	const response = {}
	try {
		if (!body?.email) {
			throw new Error()
		}
		if (isAuthd) {
			response.ok = false
			response.message = 'failure'
			res.status(403)
		}

		const result = await addToFavorites(body.email, body.id, "characters")
		if(result.ok) {
			response.ok = true
			response.message = 'success'
			res.status(200)
		}
	} catch (e) {
		response.ok = false
		response.message = 'server failure'
		res.status(500)
	}
	

	return NextResponse.json(response)
};

export { handler as POST };
