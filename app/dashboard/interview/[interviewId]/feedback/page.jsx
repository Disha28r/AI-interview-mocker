"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { use, useState } from 'react';
import React, { useEffect } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
  

function Feedback({params}) {
    
    const[feedbackList,setFeedbackList]=useState([]);
    const [totalRating, setTotalRating] = useState(0);
    const router=useRouter();


    const interviewId = use(params).interviewId;

    useEffect(()=>{
        GetFeedback();

    },[])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);

         // Calculate overall rating
         const totalRating = result.reduce((sum, item) => sum + Number(item.rating || 0), 0);
        setTotalRating(totalRating);


    }

  return (
    <div className='p-10'>
        
        
        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No previous Interview records found</h2>
            :
        <>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
        <h2 className='text-blue-800 text-lg my-3'>Your overall interview rating: <strong>{totalRating}</strong></h2>
    
        <h2 className='text-sm text-gray-500'>Find below the interview questions with the correct answer and your answer with the feedback for improvement</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-10'>
            <CollapsibleTrigger className='p-2 
            bg-secondary rounded-lg flex justify-between
            my-2 text-left gap-7 w-full'>
            {item.question} <ChevronsUpDown className='h-5 w-5 '/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-950'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-950'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-950'><strong>Feedback: </strong>{item.feedback}</h2>

              </div>
            </CollapsibleContent>
          </Collapsible>
          
        ))}
        </>}
        <Button onClick={()=>router.replace('/dashboard')} className="mt-3">Go Home</Button>
    </div>
  )
}

export default Feedback