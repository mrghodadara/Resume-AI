"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import "@smastrom/react-rating/style.css";
import { addSkillToResume, updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const SkillsForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [skillsList, setSkillsList] = useState(
    formData.skills.length > 0
      ? formData.skills
      : [
          {
            name: "",
            rating: 1,
          },
        ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (index: number, name: string, value: any) => {
    const newSkillsList = [...skillsList];
    newSkillsList[index][name] = value;
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const AddNewSkills = () => {
    const newSkillsList = [
      ...skillsList,
      {
        name: "",
        rating: 1,
      },
    ];
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const RemoveSkills = () => {
    const newSkillsList = skillsList.slice(0, -1);
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addSkillToResume(params.id, formData.skills);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Skill sets updated successfully.",
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
          Skills
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Add your skills and expertise
        </p>

        {skillsList.map((item: any, index: number) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border border-gray-700 p-3 my-5 rounded-lg">
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Skill Name:</label>
                <Input
                  name="name"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  defaultValue={item.name}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 font-semibold">Level:</label>
                <Input
                  name="level"
                  onChange={(e) => handleChange(index, "level", e.target.value)}
                  defaultValue={item.level}
                  className="no-focus bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              {skillsList.length > 1 && (
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => RemoveSkills()}
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
            onClick={AddNewSkills}
            size="sm"
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Skill
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

export default SkillsForm;
