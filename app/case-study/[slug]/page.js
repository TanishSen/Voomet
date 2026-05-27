import { notFound } from 'next/navigation'
import CaseStudyScroll from '@/components/site/CaseStudyScroll'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import { HIGHLIGHTED_PROJECTS } from '@/lib/voomet-data'

// Generate static params for all projects
export async function generateStaticParams() {
  return HIGHLIGHTED_PROJECTS.map((project) => ({
    slug: project.id,
  }))
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const project = HIGHLIGHTED_PROJECTS.find((p) => p.id === params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found | Voomet',
    }
  }

  return {
    title: `${project.name} - Office Interior Case Study | Voomet`,
    description: `Explore how Voomet designed ${project.name}'s ${project.size} workspace in ${project.location}. ${project.category} project delivered with precision and style.`,
    openGraph: {
      title: `${project.name} - Office Interior | Voomet`,
      description: `${project.size} ${project.category} project in ${project.location}`,
      images: [project.img],
    },
  }
}

export default function CaseStudyPage({ params }) {
  const project = HIGHLIGHTED_PROJECTS.find((p) => p.id === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <SiteNav />
      <main className="min-h-screen">
        <CaseStudyScroll project={project} />
      </main>
      <SiteFooter />
    </>
  )
}
