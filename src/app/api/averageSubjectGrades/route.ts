import {NextResponse} from 'next/server';
import {prisma} from '@/lib/db';
import {capitalizeFirstLetter} from '@/lib/utils';

export async function GET(req: Request) {
  try {
    const averages = await prisma.acedemics.groupBy({
      by: ['subject'],
      _avg: {
        score: true,
      },
    });

    const formattedData = averages.map((item) => ({
      name: capitalizeFirstLetter(item.subject.toLowerCase()),
      total: item._avg.score ? parseFloat(item._avg.score.toFixed(3)) : 0, // or any other default value you'd like
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      {error: 'Error fetching average scores'},
      {status: 500}
    );
  }
}
