import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const { message } = await req.json();
        
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a professional AI assistant for Appalachian Dental, providing fast, accurate, and professional responses." },
                { role: "user", content: message }
            ]
        });

        return NextResponse.json({ response: chatResponse.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ response: "Sorry, an error occurred." }, { status: 500 });
    }
}