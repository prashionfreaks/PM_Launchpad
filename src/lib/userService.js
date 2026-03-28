import { supabase } from './supabase';

export async function fetchUser(email) {
  if (!email) return null;
  const { data, error } = await supabase
    .from('users')
    .select('name, email, current_role, years_of_experience, target_role, timeline, overall_score, category_scores, weak_areas, strong_areas, selected_path, roadmap_progress, interview_result')
    .eq('email', email)
    .single();

  if (error || !data) return null;

  return {
    user: {
      name: data.name,
      email: data.email,
      currentRole: data.current_role,
      yoe: data.years_of_experience,
      targetRole: data.target_role,
      timeline: data.timeline,
    },
    quizResults: (data.overall_score != null) ? {
      overallScore: data.overall_score,
      categoryResults: data.category_scores,
      weakAreas: data.weak_areas,
      strongAreas: data.strong_areas,
    } : null,
    selectedPath: data.selected_path || null,
    roadmapProgress: data.roadmap_progress || {},
    interviewResult: data.interview_result || null,
  };
}

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
