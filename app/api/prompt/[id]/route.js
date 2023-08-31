import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (READ)
export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) {
			return new Response("Prompt not found", { status: 404 });
		}
		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch prompt", { status: 500 });
	}
};

// PATCH (UPDATE)
export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();
	try {
		await connectToDB();
		const exisitingPrompt = await Prompt.findById(params.id).populate(
			"creator"
		);
		if (!exisitingPrompt) {
			return new Response("Prompt not found", { status: 404 });
		}
        // update fields
        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save(); // save prompt
        // return
		return new Response(JSON.stringify(exisitingPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update all prompt", { status: 500 });
	}
};

// DELETE (DELETE)
export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(params.id)

		return new Response("Successfuly deleted prompt", { status: 200 });
	} catch (error) {
		return new Response("Failed to delete prompt", { status: 500 });
	}
};
