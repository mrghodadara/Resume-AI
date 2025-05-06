"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateSummary } from "@/lib/actions/gemini.actions";
import { updateResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const SummaryForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [summary, setSummary] = useState(formData?.summary || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(
    [] as any
  );
  const { toast } = useToast();

  const handleSummaryChange = (e: any) => {
    const newSummary = e.target.value;
    setSummary(newSummary);

    handleInputChange({
      target: {
        name: "summary",
        value: newSummary,
      },
    });
  };

  const generateSummaryFromAI = async () => {
    setIsAiLoading(true);

    const result = await generateSummary(formData?.jobTitle);

    setAiGeneratedSummaryList(result);

    setIsAiLoading(false);

    setTimeout(function () {
      listRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const updates = {
      summary: formData?.summary,
    };

    const result = await updateResume({
      resumeId: params.id,
      updates: updates,
    });

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Summary updated successfully.",
        className: "bg-gray-900 text-white border-gray-800",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-gray-900 text-white border-gray-800",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-500 border-t-4 bg-gray-900/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold leading-none tracking-tight text-white">
          Summary
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Add summary about your job
        </p>

        <form onSubmit={onSave}>
          <div className="mt-5">
            <ReactQuill
              theme="snow"
              value={formData?.summary}
              onChange={(value) =>
                handleInputChange({
                  target: {
                    name: "summary",
                    value: value,
                  },
                })
              }
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5" ref={listRef}>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() =>
                handleSummaryChange({
                  target: { name: "summary", value: item?.summary },
                })
              }
              className={`p-5 shadow-lg my-4 rounded-lg border-t-2 ${
                isAiLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-disabled={isAiLoading}
            >
              <h2 className="font-semibold my-1 text-primary text-gray-800">
                Level: {item?.experience_level}
              </h2>
              <p className="text-justify text-gray-600">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
