'use client';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {FormEventHandler, useState} from 'react';
import {Plus, X} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const subjects = [
  {
    label: 'Math',
    value: 'math',
  },
  {
    label: 'Science',
    value: 'science',
  },
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'History',
    value: 'history',
  },
];

type Subject = {
  subject: string;
  grade: number;
  feedback: string;
};

export default function Page() {
  const [subjectsToGrade, setSubjectsToGrade] = useState<Subject[]>([]);
  const [studentName, setStudentName] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: studentName,
      acedemics: subjectsToGrade.map((subject) => ({
        subject: subject.subject,
        grade: subject.grade,
        feedback: subject.feedback,
      })),
    };

    try {
      const response = await fetch('/api/submitGrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, maybe reset the form or navigate somewhere
        router.push('/');
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error('Error submitting data:', errorData);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
  return (
    <main className='max-w-3xl mx-auto'>
      <Link href='/'>
        <Button>Back</Button>
      </Link>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor='name'>Student Name</Label>
          <Input
            id='name'
            type='text'
            placeholder='Joey Doe'
            onChange={(e) => {
              setStudentName(e.target.value);
            }}
          />
        </div>

        {subjectsToGrade.length === 0 ? (
          <Button
            className='my-4'
            onClick={() => {
              setSubjectsToGrade((subjects) => [
                ...subjects,
                {subject: 'math', grade: 75, feedback: ''},
              ]);
            }}
          >
            Add Subject
          </Button>
        ) : (
          subjectsToGrade.map((_, index) => (
            <div key={index} className='flex items-top'>
              <div className='flex-1'>
                <div className='flex gap-2 items-top flex-1'>
                  <div className='flex-1'>
                    <Label htmlFor='subject'>Subject</Label>
                    <div className='flex-1'>
                      <Select
                        value={subjectsToGrade[index].subject}
                        onValueChange={(subject) => {
                          setSubjectsToGrade((subjects) => {
                            const newSubjects = [...subjects];
                            newSubjects[index].subject = subject;
                            return newSubjects;
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a subject' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {subjects.map((subject) => (
                              <SelectItem
                                value={subject.value}
                                key={subject.value}
                              >
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='flex-[0.25]'>
                    <Label htmlFor='grade'>Grade</Label>
                    <Input
                      id='grade'
                      type='number'
                      placeholder='73'
                      value={subjectsToGrade[index].grade}
                      onChange={(e) => {
                        setSubjectsToGrade((subjects) => {
                          const newSubjects = [...subjects];
                          newSubjects[index].grade = parseInt(
                            e.target.value,
                            10
                          );
                          return newSubjects;
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor='feedback'>Feedback</Label>
                  <Textarea
                    id='feedback'
                    placeholder='Great job!'
                    value={subjectsToGrade[index].feedback}
                    onChange={(e) => {
                      setSubjectsToGrade((subjects) => {
                        // set the feedback for the subject at the current index
                        const newSubjects = [...subjects];
                        newSubjects[index].feedback = e.target.value;
                        return newSubjects;
                      });
                    }}
                  />
                </div>
                {subjectsToGrade.length === index + 1 &&
                  subjectsToGrade.length < 4 && (
                    <div className='w-full my-4'>
                      <Button
                        className='w-14 h-14 rounded-full bg-transparent border-[0.5px] border-gray-300 hover:bg-gray-100'
                        type='button'
                        onClick={() => {
                          setSubjectsToGrade((subjects) => [
                            ...subjects,
                            {subject: 'math', grade: 75, feedback: ''},
                          ]);
                        }}
                      >
                        <Plus color='gray' />
                      </Button>
                    </div>
                  )}
              </div>
              <X
                className='mt-8 cursor-pointer'
                onClick={() => {
                  setSubjectsToGrade((subjects) =>
                    subjects.filter((_, i) => i !== index)
                  );
                }}
              />
            </div>
          ))
        )}

        <Button type='submit' className='w-full mt-4'>
          Submit
        </Button>
      </form>
    </main>
  );
}
