import {prisma} from '@/lib/db';
import {NextResponse} from 'next/server';

export async function GET(req: Request) {
  const feedbacks = await prisma.acedemics.findMany({
    select: {
      feedback: true,
    },
  });

  const feedbackText = feedbacks
    .map((feedback) => feedback.feedback)
    .join('\n');
  const gptPrompt = {
    role: 'assistant',
    content: `I have received the following feedback from academic evaluations:\n\n${feedbackText}\n\nCan you provide a concise summary or analysis based on this feedback?`,
  };

  async function fetchPrompt() {
    const result = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_TOKEN}`,
      },
      body: JSON.stringify({
        messages: [gptPrompt],
        model: 'gpt-3.5-turbo-16k-0613',
        max_tokens: 500,
      }),
    });

    const data = await result.json();
    return data.choices[0].message.content;
  }

  try {
    const summary = await fetchPrompt();
    console.log(summary);
    return NextResponse.json({summary}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: 'Error generating summary.'},
      {status: 500}
    );
  }
}
