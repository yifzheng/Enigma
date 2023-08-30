import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
	const { userId, prompt, tag } = await req.json(); // deconstruct passed info

	try {
		await connectToDB(); // connect to db
		// create new prompt
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});
		await newPrompt.save(); // attempt to save prompt

		return new Response(JSON.stringify(newPrompt), { status: 201 }); // return prompt
	} catch (error) {
		return new Response("Failed to create new prompt", { status: 500 });
	}
};
