import ProjectsClient from './ProjectsClient';

async function getProjects() {
  const url = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
  try {
    const response = await fetch(`${url}/projects`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects on server:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return <ProjectsClient initialProjects={projects} />;
}
