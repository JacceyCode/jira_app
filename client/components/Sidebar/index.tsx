"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen size is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // You can change 768px based on your mobile breakpoint
    };

    // Check the screen size initially
    checkIsMobile();

    // Add resize event listener to track screen size changes
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: projects } = useGetProjectsQuery();

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  const sidebarClassNames = `fixed flex flex-col justify-between shadow-xl trasition-all duration-300 h-screen z-40 dark:bg-black bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <aside className={`${sidebarClassNames}`}>
      <section className="flex h-[93%] w-full flex-col justify-start md:h-full">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            JAFEL
          </h1>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              {
                <X className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
              }
            </button>
          )}
        </div>

        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="https://jira-s3-images.s3.amazonaws.com/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              JAFEL TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        <section className="overflow-y-auto">
          {/* NAVBAR LINKS */}
          <nav className="z-10 w-full">
            <SidebarLink
              isMobile={isMobile}
              icon={Home}
              label="Home"
              href="/"
            />
            <SidebarLink
              isMobile={isMobile}
              icon={Briefcase}
              label="Timeline"
              href="/timeline"
            />
            <SidebarLink
              isMobile={isMobile}
              icon={Search}
              label="Search"
              href="/search"
            />
            <SidebarLink
              isMobile={isMobile}
              icon={Settings}
              label="Settings"
              href="/settings"
            />
            <SidebarLink
              isMobile={isMobile}
              icon={User}
              label="Users"
              href="/users"
            />
            <SidebarLink
              isMobile={isMobile}
              icon={Users}
              label="Teams"
              href="/teams"
            />
          </nav>

          {/* PROJECTS LINKS*/}
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Projects</span>
            {showProjects ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </button>
          {/* PROJECT LISTS */}
          {showProjects &&
            projects?.map((project) => (
              <SidebarLink
                isMobile={isMobile}
                key={project.id}
                icon={Briefcase}
                label={project.name}
                href={`/projects/${project.id}`}
              />
            ))}

          {/* PRIORITY LINKS */}
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Priority</span>
            {showPriority ? (
              <ChevronUp className="size-5" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </button>
          {showPriority && (
            <>
              <SidebarLink
                isMobile={isMobile}
                icon={AlertCircle}
                label="Urgent"
                href="/priority/urgent"
              />
              <SidebarLink
                isMobile={isMobile}
                icon={ShieldAlert}
                label="High"
                href="/priority/high"
              />
              <SidebarLink
                isMobile={isMobile}
                icon={AlertTriangle}
                label="Medium"
                href="/priority/medium"
              />
              <SidebarLink
                isMobile={isMobile}
                icon={AlertOctagon}
                label="Low"
                href="/priority/low"
              />
              <SidebarLink
                isMobile={isMobile}
                icon={Layers3}
                label="Backlog"
                href="/priority/backlog"
              />
            </>
          )}
        </section>
      </section>

      <section className="z-10 flex h-16 w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
        <section className="flex w-full items-center">
          <div className="align-center flex size-9 justify-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://jira-s3-images.s3.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="size-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </section>
      </section>
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isMobile: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isMobile,
}: SidebarLinkProps) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link
      href={href}
      className="w-full"
      onClick={() =>
        isMobile ? dispatch(setIsSidebarCollapsed(!isSidebarCollapsed)) : null
      }
    >
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="size-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium capitalize text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
