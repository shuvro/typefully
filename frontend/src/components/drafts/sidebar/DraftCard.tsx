import { Cross2Icon } from "@radix-ui/react-icons";
import cn from "../../../utils/cn";
import { HStack } from "../../ui/layout";
import { P2 } from "../../ui/typography";

export default function DraftCard({
  previewText,
  isSelected,
  onClick,
  onDeleteClick,
}: {
  previewText: string;
  isSelected: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <DraftCardWrapper
      onClick={onClick}
      className="flex-row flex-nowrap group relative"
    >
      {isSelected && (
        <div className="h-full w-[4px] absolute left-0 bg-blue-400" />
      )}
      <P2 className="text-current min-h-1 flex flex-1">
        {previewText.length > 0 ? previewText : <>&nbsp;</>}
      </P2>
      <Cross2Icon
        className="opacity-0 group-hover:opacity-100 transition duration-150"
        onClick={onDeleteClick}
      />
    </DraftCardWrapper>
  );
}

export const DraftCardWrapper = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <HStack
      {...props}
      className={cn(
        "w-full p-3 gap-2 text-slate-500 hover:text-slate-800 border-b border-b-slate-200",
        "cursor-pointer select-none",
        className
      )}
    />
  );
};
