import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log("Received coding assistant request with messages:", messages.length);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not properly configured");
    }

    const systemPrompt = `You are an expert Coding Instructor AI with deep knowledge across multiple programming languages and paradigms. Your role is to:

1. **Explain Programming Concepts**: Break down complex topics into clear, step-by-step explanations
2. **Generate Code**: Provide clean, well-commented code examples with best practices
3. **Debug Code**: Identify errors and suggest fixes with detailed explanations
4. **Adapt to Skill Level**: Adjust explanations based on learner's understanding
5. **Support Multiple Languages**: Help with Python, JavaScript, Java, C++, TypeScript, Go, Rust, SQL, and more

Guidelines:
- Always format code snippets with proper syntax highlighting using markdown code blocks
- Include language identifier in code blocks (e.g., \`\`\`python)
- Provide context and explanations for your code examples
- Ask clarifying questions when needed
- Suggest best practices and optimization tips
- Be encouraging and supportive
- Use examples to illustrate concepts
- When debugging, explain the error and the solution

Format your responses clearly with:
- **Headings** for different sections
- \`Code blocks\` for all code examples
- **Bold** for key terms
- Clear separation between explanation and code`;

    console.log("Calling Lovable AI Gateway...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");
    
    const assistantMessage = data.choices?.[0]?.message?.content;
    
    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in coding-assistant function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
