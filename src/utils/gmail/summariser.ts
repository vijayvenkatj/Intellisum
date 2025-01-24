import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Summariser(sender: string, content: string) {

    try{
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_APIKEY!); // Set your API key here
    const model = await genAi.getGenerativeModel({ model: "gemini-2.0-flash-exp", generationConfig: {responseMimeType : "application/json"} });

    const template = `
    You are a personal assistant who summarizes the mail contents and provides a summary based on the given content.
    Result should only contain the result nothing else like json or \` strictly.
    Respond with a JSON object using the following instructions: 
    {
        "sender": "<Sender of the email>",
        "context": "<1 line describing the content of the email>"
    }
    
    Sender: ${sender}
    Content: ${content}
    `;

    const result = await model.generateContent([template]);
    
    return JSON.parse(result.response.text());
    }
    catch(e){
        console.log(e);
        return {sender: sender, context: content};
    }
}

