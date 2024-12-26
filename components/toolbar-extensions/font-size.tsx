import {  MinusIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";

export const FontSizeBtn = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newVal: string) => {
    const size = parseInt(newVal);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newVal);
      setInputValue(newVal);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const Increment = () => {
    const newVal = parseInt(fontSize) + 1;
    updateFontSize(newVal.toString());
  };

  const Decrement = () => {
    const newVal = parseInt(fontSize) - 1;
    if (newVal > 0) {
      updateFontSize(newVal.toString());
    } else {
      return;
    }
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  return( <div className="w-[120px] p-2 flex items-center gap-x-0.5">
    <button
        className={cn('h-7  text-sm flex justify-center items-center w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
        onClick={Decrement}
        >
            <MinusIcon className="size-4"/>
        </button>

{isEditing ? (
    <input
    type="text"
    onBlur={handleInputBlur}
    onKeyDown={handleKeyDown}
    onChange={handleInputChange}
    value={inputValue}
    className="h-7  text-sm border border-neutral-500 w-10  px-1.5 overflow-hidden  text-center  bg-transparent focus:outline-none focus:ring-0 rounded-sm"
    />
) : (
    <button
    className={cn('h-7  text-sm border border-neutral-500 w-10  px-1.5 overflow-hidden  text-center hover:bg-neutral-200/80 rounded-sm cursor-text bg-transparent')}
    onClick={()=>{
        setIsEditing(true)
        setFontSize(currentFontSize)
    }}
    >
{currentFontSize}
    </button>  
)}


    <button
        className={cn('h-7  text-sm flex justify-center items-center w-7  px-1.5 overflow-hidden shrink-0 hover:bg-neutral-200/80 rounded-sm')}
        onClick={Increment}
        >
            <PlusIcon    className="size-4"/>
        </button>




  </div>);
};
