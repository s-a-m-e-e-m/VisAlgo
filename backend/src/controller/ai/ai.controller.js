import Groq from "groq-sdk";

let groqClient;

export default async function getResponse(req, res) {
    try {
        if (!groqClient) {
            if (!process.env.API_KEY) {
                console.error('GROQ_API_KEY is not set');
                return res.status(500).json({ message: 'Server configuration error: GROQ_API_KEY missing' });
            }
            groqClient = new Groq({ apiKey: process.env.API_KEY });
        }
        const { question } = req.body;

        const prompt = `You are a data structure and algorithm tutor.\nWrite correct, well-commented answer with explanation for the Question: ${question}`;

        const result = await groqClient.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({ answer: result.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}