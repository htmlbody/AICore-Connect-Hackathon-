import axios from 'axios';

/**
 * GitHub Data Fetcher
 * This fetches public profile data and repository information.
 */

export const fetchGithubProfile = async (username) => {
  try {
    // Extract username from URL if necessary
    const cleanUsername = username.replace('github.com/', '').replace('https://', '').replace('http://', '').split('/')[0];
    
    const [profileRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${cleanUsername}`),
      axios.get(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=5`)
    ]);

    return {
      profile: profileRes.data,
      repos: reposRes.data
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw new Error("Could not find GitHub profile. Please check the URL.");
  }
};
