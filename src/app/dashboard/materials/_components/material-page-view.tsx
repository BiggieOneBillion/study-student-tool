"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { v4 } from "uuid";
import { CircleAlert } from "lucide-react";
import TeneryConditions from "@/components/global/tenery-conditions";
import Conditions from "@/components/global/single-conditions";
import Link from "next/link";
import { useAuthStore } from "@/store/user-store";

type materialType = {
  topic: string;
  level: string;
  info: object[];
};

const MaterialPageView = () => {
  const details = useAuthStore((state) => state.details);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const response = await axios.get(`/api/study-plan/${details.id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex items-center gap-2 rounded-lg bg-white/70 px-6 py-3 shadow-lg backdrop-blur-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          <span className="text-gray-700">Loading materials...</span>
        </div>
      </div>
    );
  }

  if (isError || data === false) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-lg bg-red-50/70 px-6 py-4 text-red-700 shadow-lg backdrop-blur-sm">
          <CircleAlert className="h-5 w-5" />
          <span>Unable to fetch your study materials</span>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-4">
      <div className="container mx-auto">
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Study Materials
            </h1>
            <Conditions condition={data && data.length > 0}>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {data && data.length || 0} {data && data.length === 1 ? 'material' : 'materials'}
              </span>
            </Conditions>
          </div>
          <TeneryConditions
            condition={data && data.length > 0}
            ifTrue={
              <div className="rounded-lg bg-white/70 px-4 py-3 backdrop-blur-sm w-fit">
                <p className="text-sm text-gray-600">
                  Browse through your study materials and click on any card to view detailed content.
                </p>
              </div>
            }
            ifFalse={
              <div className="flex items-center gap-3 rounded-lg bg-blue-50/70 px-4 py-3 text-blue-700 backdrop-blur-sm">
                <CircleAlert className="h-5 w-5" />
                <p className="text-sm font-medium">Visit the home page to create your first study material</p>
              </div>
            }
          />
        </header>

        <TeneryConditions
          condition={data && data.length > 0}
          ifTrue={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data && data.map((material: materialType, index: number) => (
                <Link
                  href={`/dashboard/materials/my-learning/${index}`}
                  key={v4()}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white/70 p-6 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-indigo-500/20 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative space-y-4">
                    <h2 className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-indigo-600">Lesson Topic</span>
                      <span className="font-semibold text-gray-900">{material.topic}</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Level</p>
                        <p className="mt-1 capitalize text-gray-900">{material.level}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Modules</p>
                        <p className="mt-1 text-gray-900">{material.info.length}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          }
          ifFalse={
            <div className="flex h-[50vh] items-center justify-center rounded-xl border border-gray-100 bg-white/70 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-300">
                  No study materials found
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Start by creating your first study material
                </p>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default MaterialPageView;
