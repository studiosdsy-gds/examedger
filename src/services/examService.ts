import { createClient } from '@supabase/supabase-js';
import { EXAMS } from '../../data/examsData';
import { supabase } from './supabaseClient';

import { ExamStatus } from '../../types';

// remove local init


export const fetchLiveExamDates = async () => {
    // 1. Fetch live dates from Supabase
    const { data: liveData, error } = await supabase
        .from('exams')
        .select('exam_name, exam_date, application_start, application_end, official_link');

    if (error || !liveData) {
        console.error('Error fetching live exams:', error);
        return EXAMS; // Fallback to mock data if DB fails
    }

    // 2. Merge Live Data into your Static EXAMS list
    // We map over the static list and inject dates if found in DB
    console.log('Live Data from Supabase:', liveData);

    const updatedExams = EXAMS.map((staticExam) => {
        // Fuzzy match: Check if Supabase name contains the Static name (e.g. "VITEEE 2026" contains "VITEEE")
        const liveMatch = liveData.find(
            (d) => d.exam_name.toLowerCase().includes(staticExam.name.toLowerCase()) ||
                staticExam.name.toLowerCase().includes(d.exam_name.toLowerCase())
        );

        if (liveMatch) {
            console.log(`Match found for ${staticExam.name}:`, liveMatch);

            // Helper to format date only (YYYY-MM-DD)
            const formatDate = (dateStr: string | null) => dateStr ? dateStr.split('T')[0] : 'TBA';

            return {
                ...staticExam,
                // Update dates only if they exist in DB
                dates: {
                    ...staticExam.dates,
                    examDate: formatDate(liveMatch.exam_date) !== 'TBA' ? formatDate(liveMatch.exam_date) : staticExam.dates.examDate,
                    registrationStart: formatDate(liveMatch.application_start) !== 'TBA' ? formatDate(liveMatch.application_start) : staticExam.dates.registrationStart,
                    registrationEnd: formatDate(liveMatch.application_end) !== 'TBA' ? formatDate(liveMatch.application_end) : staticExam.dates.registrationEnd,
                },
                // Add the real official link
                officialWebsite: liveMatch.official_link || staticExam.officialWebsite,
                // Mark as 'UPDATED' so we can show a badge in UI
                status: 'OPEN' as ExamStatus,
            };
        }
        return staticExam;
    });

    console.log('Updated Exams List:', updatedExams);
    return updatedExams;
};