import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseAudit } from "@/lib/parse_audit";
import { getSession } from "next-auth/react";

interface AuditData {
  data: {
    entry_data: any[];
    req_data: any[];
  };
}

export default function SchedulePage() {
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [requiredCourses, setRequiredCourses] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetAudit = () => {
    localStorage.removeItem('auditData');
    setAuditData(null);
    setRequiredCourses([]);
    setAuditSubmitted(false);
  }

  const loadAuditData = (data: AuditData) => {
    setAuditData(data);
    if (data.data.req_data) {
      setRequiredCourses(data.data.req_data);
      setAuditSubmitted(true);
    } else {
      resetAudit();
      alert("Failed to parse audit. Please try again.");
    }
  }

  useEffect(() => {
    const savedAuditData = localStorage.getItem('auditData');
    if (savedAuditData) {
      loadAuditData(JSON.parse(savedAuditData));
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Uploading file...");
    if (event.target.files && event.target.files[0]) {
      setIsLoading(true);
      const data = await parseAudit(event.target.files[0]);
      console.log(data);
      if (data === null) {
        alert("Failed to parse audit. Please try again.");
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        loadAuditData(data);
        localStorage.setItem('auditData', JSON.stringify(data));
      }
      setIsLoading(false);
    }
  };

  if (!auditSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Get Started</h1>
          <p className="text-xl text-muted-foreground max-w-[500px]">
            Upload your degree audit so we can help create your perfect schedule
          </p>
          <div className="flex justify-center">
            <label htmlFor="file-upload" className={`flex items-center justify-center gap-2 p-4 border rounded-md hover:bg-accent transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              <input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
              {isLoading ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              )}
              {isLoading ? 'Processing...' : 'Upload Degree Audit'}
            </label>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Course Schedule Builder</h1>
          <p className="text-xl text-muted-foreground">
            Create your perfect semester schedule by selecting courses and visualizing your weekly calendar.
          </p>
          <div className="flex justify-center gap-4">
            <label htmlFor="new-audit-upload" className="px-4 py-2 text-sm border rounded-md hover:bg-accent transition-colors cursor-pointer flex items-center gap-2">
              <input
                id="new-audit-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload New Degree Audit
            </label>
            <button
              onClick={resetAudit}
              className="px-4 py-2 text-sm border rounded-md hover:bg-accent transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Schedule Display Area */}
        <div className="w-full h-[600px] border rounded-lg bg-card p-4">
          <p className="text-center text-muted-foreground">
            Your schedule will appear here
          </p>
        </div>

        {/* Required Courses Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Required Courses</h2>
            <div className="grid gap-2 overflow-y-auto min-h-[300px] max-h-[400px] pr-2">
              {requiredCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md hover:bg-accent transition-colors"
                >
                  {course.course}: {course.title} ({course.credits} credits)
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Availability</h2>
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-2 p-3 border rounded-md hover:bg-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload ICS File
              </button>

              <button className="flex items-center justify-center gap-2 p-3 border rounded-md hover:bg-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Sync with Google Calendar
              </button>

              <button className="flex items-center justify-center gap-2 p-3 border rounded-md hover:bg-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Enter Availability Manually
              </button>
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <Card className="w-full h-[400px] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Schedule Assistant</h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            {/* Chat messages would go here */}
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                Hello! I can help you build your schedule.
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button>Send</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass data to the page
  };
}
