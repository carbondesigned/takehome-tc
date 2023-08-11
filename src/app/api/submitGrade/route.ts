import {NextResponse} from 'next/server';
import {prisma} from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.student && body.acedemics) {
    try {
      const student = await prisma.student.create({
        data: {
          name: body.student.name,
          acedemics: {
            create: {
              subject: body.acedemics.subject,
              score: body.acedemics.score,
              feedback: body.acedemics.feedback,
            },
          },
        },
      });
    } catch (error) {
      return NextResponse.json(
        {error: 'Error while submitting grade'},
        {status: 500}
      );
    }
  } else {
    return NextResponse.json(
      {error: 'Missing student or acedemics'},
      {status: 400}
    );
  }
  return NextResponse.json({success: true}, {status: 200});
}
