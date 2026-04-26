import axios from 'axios';

const AI_CONFIG = {
  endpoint: 'https://api.openai.com/v1/chat/completions',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
};

/**
 * Specialized GitHub Profile Assessment
 */
export const assessGithubProfile = async (profileData) => {
  const { profile, repos } = profileData;
  
  const prompt = `
    Analyze this GitHub profile and top repositories as an elite tech recruiter.
    
    Profile: ${profile.name || profile.login} - ${profile.bio || 'No bio'}
    Stats: ${profile.public_repos} repos, ${profile.followers} followers.
    Top Repos: ${repos.map(r => `${r.name}: ${r.description} (Stars: ${r.stargazers_count}, Lang: ${r.language})`).join(' | ')}
    
    Return a JSON response with exactly these fields:
    1. recruiter_score: (Integer 0-100)
    2. insight: (A 2-sentence feedback on what a recruiter would notice)
    3. resume_bullet: (A powerful, professional bullet point for their resume based on their best repo)
    4. global_rank: (A creative ranking name like "Elite Architect" or "Rising Star")
    5. top_strengths: (List of 3 strengths)
  `;

  if (!AI_CONFIG.apiKey) {
    return {
      recruiter_score: 82,
      insight: "Strong foundational knowledge in multiple languages. Documentation is clear and repo structure is professional.",
      resume_bullet: "Architected a modular system with high documentation standards, increasing code maintainability and reusability.",
      global_rank: "Top 12%",
      top_strengths: ["Consistency", "Documentation", "Versatility"]
    };
  }

  try {
    const response = await axios.post(
      AI_CONFIG.endpoint,
      {
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      },
      { headers: { 'Authorization': `Bearer ${AI_CONFIG.apiKey}` } }
    );
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("AI Assessment Error:", error);
    return null;
  }
};
