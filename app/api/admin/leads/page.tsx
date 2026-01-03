export default async function LeadsPage() {
    // Later fetch from DB
    const leads = [];
  
    return (
      <div className="max-w-5xl mx-auto py-16">
        <h1 className="text-3xl font-bold mb-6">AI Leads</h1>
  
        {leads.length === 0 && (
          <p className="text-gray-500">No leads yet.</p>
        )}
      </div>
    );
  }
  