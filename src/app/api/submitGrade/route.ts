import {NextResponse} from 'next/server';
import {prisma} from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.name && body.acedemics && Array.isArray(body.acedemics)) {
    try {
      const student = await prisma.student.create({
        data: {
          name: body.name,
          acedemics: {
            create: body.acedemics.map(
              (academic: {subject: string; grade: any; feedback: any}) => ({
                subject: academic.subject.toUpperCase(),
                score: academic.grade,
                feedback: academic.feedback,
              })
            ),
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
      {error: 'Missing student name or acedemics'},
      {status: 400}
    );
  }
  return NextResponse.json({success: true}, {status: 200});
}
