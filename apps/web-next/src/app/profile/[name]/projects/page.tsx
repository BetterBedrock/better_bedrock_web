import { notFound } from "next/navigation";
import { styles, ProjectsList } from ".";

interface ProjectsProps {
  params?: Promise<{ name: string }>;
}

export default async function Projects({ params }: ProjectsProps) {
  const loadedParams = await params;
  if(!loadedParams) {
    notFound();
  }

  return (
    <div className={styles.list}>
      <ProjectsList params={loadedParams} />
    </div>
  );
}
