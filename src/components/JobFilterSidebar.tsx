import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });
  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilterSidebar() {
  const distintLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="md:w-[260px] p-4 sticky top-0 bg-background h-fit border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location>">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {distintLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-slate-800"
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}