"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import React, { useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { addExperienceToResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const ExperienceForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [experienceList, setExperienceList] = useState(
    formData?.experience || [
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
  );

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...experienceList];
    list[index][name] = value;
    setExperienceList(list);

    handleInputChange({
      target: {
        name: "experience",
        value: list,
      },
    });
  };

  const handleAdd = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);

    handleInputChange({
      target: {
        name: "experience",
        value: list,
      },
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addExperienceToResume(params.id, formData.experience);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Experience details updated successfully.",
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
          Experience
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Add your work experience
        </p>

        {experienceList.map((item: any, index: number) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border border-gray-700 p-3 my-5 rounded-lg">
              <div className="col-span-2 space-y-2">
                <label className="text-gray-300 font-semibold">
                  Company Name:
                </label>
                <Input
                  name="companyName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.companyName}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Job Title:</label>
                <Input
                  name="jobTitle"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.jobTitle}
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
              {experienceList.length > 1 && (
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
            <Plus className="h-4 w-4 mr-2" /> Add Experience
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
    </div>
  );
};

export default ExperienceForm;
