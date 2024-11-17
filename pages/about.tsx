export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-[700px]">
            Learn more about the team and mission behind the UMass Boston Course Scheduler
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We started this project in 2023 with a simple goal: make course scheduling easier for UMass Boston students. 
              Our platform combines modern technology with user-friendly design to help students create their ideal class schedules.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Why Choose Us</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
                Built specifically for UMass Boston's course system
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
                Real-time updates and accurate course information
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full" />
                User-friendly interface designed for students
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Team</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're a group of UMass Boston students and alumni who understand the challenges of course scheduling. 
              Our diverse team brings together expertise in computer science, user experience design, and academic planning.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions or suggestions? We'd love to hear from you! Reach out to our team at{' '}
              <a href="mailto:support@umbscheduler.com" className="text-blue-500 hover:underline">
                support@umbscheduler.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
