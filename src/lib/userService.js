import { supabase } from './supabase';

export async function upsertUser(user) {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        name: user.name,
        email: user.email,
        current_role: user.currentRole,
        years_of_experience: user.yoe,
        target_role: user.targetRole,
        timeline: user.timeline,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select('id')
    .single();

  if (error) console.error('Supabase upsertUser error:', error);
  return data?.id || null;
}

export async function updateQuizResults(email, quizResults) {
  if (!email) return;
  const { error } = await supabase
    .from('users')
    .update({
      overall_score: quizResults.overallScore,
      category_scores: quizResults.categoryResults,
      weak_areas: quizResults.weakAreas,
      strong_areas: quizResults.strongAreas,
      updated_at: new Date().toISOString(),
    })
    .eq('email', email);

  if (error) console.error('Supabase updateQuizResults error:', error);
}

export async function updateSelectedPath(email, selectedPath) {
  if (!email) return;
  const { error } = await supabase
    .from('users')
    .update({ selected_path: selectedPath, updated_at: new Date().toISOString() })
    .eq('email', email);

  if (error) console.error('Supabase updateSelectedPath error:', error);
}

export async function updateRoadmapProgress(email, roadmapProgress) {
  if (!email) return;
  const { error } = await supabase
    .from('users')
    .update({ roadmap_progress: roadmapProgress, updated_at: new Date().toISOString() })
    .eq('email', email);

  if (error) console.error('Supabase updateRoadmapProgress error:', error);
}

export async function updateInterviewResult(email, interviewResult) {
  if (!email) return;
  const { error } = await supabase
    .from('users')
    .update({ interview_result: interviewResult, updated_at: new Date().toISOString() })
    .eq('email', email);

  if (error) console.error('Supabase updateInterviewResult error:', error);
}
