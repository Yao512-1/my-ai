export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  const { messages } = req.body;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.DEEPSEEK_API_KEY,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: messages,
        stream: false,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
