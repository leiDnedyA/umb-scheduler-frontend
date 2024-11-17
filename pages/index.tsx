import localFont from "next/font/local";
import Link from "next/link";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className={`min-h-screen bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            UMass Boston Course Scheduler
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px]">
            Plan your perfect semester with our intelligent course scheduling tool, designed specifically for UMass Boston students.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mt-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">AI-Powered Scheduling</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your preferences and creates optimized schedules, considering professor ratings and course conflicts.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Professor Insights</h3>
              <p className="text-muted-foreground">
                Make informed decisions with integrated RateMyProfessor data and reviews for each instructor.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized course suggestions based on historical student data and professor ratings.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Link href="/schedule" className="relative px-8 py-3 rounded-md font-medium overflow-hidden transition-all duration-300 bg-muted hover:shadow-[0_0_25px_rgba(37,99,235,0.8)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-blue-500 before:animate-[gradient_3s_ease_infinite] before:bg-[length:200%_200%] before:opacity-100 hover:before:opacity-100 before:transition-opacity before:-z-10">
              Get Started
            </Link>
            <Link href="/about" className="border border-primary hover:bg-primary hover:text-secondary px-8 py-3 rounded-md font-medium transition-colors duration-500">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
