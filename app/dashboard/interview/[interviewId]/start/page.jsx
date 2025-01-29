"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import { use } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function StartInterview({params}) {
    const [interviewData,setInterviewData]=useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion]=useState(null);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    const interviewId = use(params).interviewId;

    useEffect(()=>{
        GetInterviewDetails();
    },[]);

    /***Used to get interview details by MockId/Interview Id */
    const GetInterviewDetails=async()=>{
            const result=await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));
            
            if(result.length>0){
            const jsonMockResp=JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
        }else {
            console.error('No interview data found for the given ID');
        } 
        }
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap'>
            {/*Questions*/}
            <QuestionsSection
             mockInterviewQuestion={mockInterviewQuestion}
             activeQuestionIndex={activeQuestionIndex}
             />
            

            {/*Video/Audio Recording*/}
            <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />

        </div>
        <div className='flex justify-end gap-6'>
         {activeQuestionIndex>0&&  
         <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1&&  
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button>End Interview</Button>
          </Link>} 
        </div>
    </div>
  )
}

export default StartInterview