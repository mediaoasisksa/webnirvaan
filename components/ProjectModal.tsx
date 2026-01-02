export default function ProjectModal({ project, onClose }: any) {
    if (!project) return null;
  
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
        <div className="bg-white max-w-xl w-full rounded-2xl p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>
  
          <h3 className="text-2xl font-bold">{project.name}</h3>
          <p className="mt-3 text-gray-600">{project.description}</p>
  
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="text-sm px-3 py-1 rounded-full bg-gray-100"
              >
                {t}
              </span>
            ))}
          </div>
  
          <a
            href={project.url}
            target="_blank"
            className="mt-6 inline-block text-white px-6 py-3 rounded-lg
            bg-gradient-to-r from-purple-600 to-blue-500"
          >
            Visit Live Site →
          </a>
        </div>
      </div>
    );
  }
  