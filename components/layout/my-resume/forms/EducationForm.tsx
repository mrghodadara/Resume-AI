"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateEducationDescription } from "@/lib/actions/gemini.actions";
import { addEducationToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Brain, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const EducationForm = ({ params }: { params: { id: string } }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGeneratedDescriptionList, setAiGeneratedDescriptionList] = useState(
    [] as any
  );
  const { toast } = useToast();

  const [educationList, setEducationList] = useState(
    formData?.education || [
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
  );

  useEffect(() => {
    educationList.forEach((education: any, index: number) => {
      const textarea = document.getElementById(`description-${index}`) as any;
      if (textarea) {
        textarea.value = education.description;
      }
    });
  }, [educationList]);

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...educationList];
    list[index][name] = value;
    setEducationList(list);

    handleInputChange({
      target: {
        name: "education",
        value: list,
      },
    });
  };

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const list = [...educationList];
    list.splice(index, 1);
    setEducationList(list);

    handleInputChange({
      target: {
        name: "education",
        value: list,
      },
    });
  };

  const generateEducationDescriptionFromAI = async (index: number) => {
    if (
      !formData?.education[index]?.universityName ||
      formData?.education[index]?.universityName === "" ||
      !formData?.education[index]?.degree ||
      formData?.education[index]?.degree === "" ||
      !formData?.education[index]?.major ||
      formData?.education[index]?.major === ""
    ) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description:
          "Please enter the name of institute, degree and major to generate description.",
        variant: "destructive",
        className: "bg-gray-900 text-white border-gray-800",
      });

      return;
    }

    setIsAiLoading(true);

    const result = await generateEducationDescription(
      `${formData?.education[index]?.universityName} on ${formData?.education[index]?.degree} in ${formData?.education[index]?.major}`
    );

    setAiGeneratedDescriptionList(result);

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

    const result = await addEducationToResume(params.id, formData.education);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Educational details updated successfully.",
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
          Education
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Add your educational details
        </p>

        {educationList.map((item: any, index: number) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border border-gray-700 p-3 my-5 rounded-lg">
              <div className="col-span-2 space-y-2">
                <label className="text-gray-300 font-semibold">
                  Name of Institute:
                </label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Degree:</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Major:</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">
                  Start Date:
                </label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">End Date:</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-gray-300 font-semibold">
                  Description:
                </label>
                <Input
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              {educationList.length > 1 && (
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => handleRemove(index)}
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-5">
          <Button
            type="button"
            onClick={handleAdd}
            size="sm"
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={onSave}
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
      </div>

      {aiGeneratedDescriptionList.length > 0 && (
        <div className="my-5" ref={listRef}>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedDescriptionList?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() =>
                handleChange(
                  {
                    target: { name: "description", value: item?.description },
                  },
                  index
                )
              }
              className={`p-5 shadow-lg my-4 rounded-lg border-t-2 ${
                isAiLoading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-disabled={isAiLoading}
            >
              <h2 className="font-semibold my-1 text-primary text-gray-800">
                Level: {item?.activity_level}
              </h2>
              <p className="text-justify text-gray-600">{item?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
