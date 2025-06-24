import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Get form data from the request
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Convert the file to an array buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    // Convert to Buffer and then to base64
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString('base64');
    
    // Call xAI API with the image
    const url = "https://api.x.ai/v1/chat/completions";
    
    const payload = {
      model: "grok-2-vision-latest",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Content}`,
                detail: "high",
              },
            },
            {
              type: "text",
              text: "Count the exact number of medicine tablets visible in this image. Only provide the number of tablets, nothing else.",
            },
          ],
        },
      ],
      temperature: 0.1
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    
    return NextResponse.json({ count: result });
    
  } catch (error) {
    console.error("Error processing tablet count:", error);
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 