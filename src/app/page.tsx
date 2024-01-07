import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobList from "@/components/JobList";
import prisma from "@/lib/prisma";
export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
        <div className="space-y-5 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Developer Jobs
          </h1>
          <p className="text-muted-foreground">Find your dream job</p>
        </div>
        <section className="flex flex-col md:flex-row gap-4">
          <JobFilterSidebar />
          <div className="space-y-4 grow">
            {jobs.map((job) => (
              <JobList job={job} key={job.id} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
