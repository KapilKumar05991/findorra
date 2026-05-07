import { ScrollArea } from "@repo/ui/components/scroll-area";
import * as React from "react";

interface ItemsHeadingProp {
  text: string;
}

export function ItemsHeading({ text }: ItemsHeadingProp) {
  return <p className="px-2 py-1 text-start">{text}</p>;
}

interface ItemProp {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}

export function Item({
  icon,
  title,
  text,
  extra,
  onClick,
}: ItemProp & { extra?: string }) {
  return (
    <div
      onClick={onClick}
      className="text-sm cursor-pointer hover:bg-muted flex items-center gap-4 rounded-md px-2 py-2"
    >
      <div className="size-10 flex items-center justify-center rounded-md shrink-0">
        {icon}
      </div>
      <div className="text-start flex flex-col overflow-hidden">
        <span className="font-medium truncate">{title}</span>
        {text && (
          <span className="text-xs text-muted-foreground truncate">{text}</span>
        )}
        {extra && (
          <span className="text-xs text-primary truncate">{extra}</span>
        )}
      </div>
    </div>
  );
}

interface AutoCompleteProp {
  children: React.ReactNode;
}

export function AutoComplete({ children }: AutoCompleteProp) {
  return (
    <div className="z-50 absolute rounded-md bg-background top-14 h-80 w-full">
      <ScrollArea className="h-full w-full p-2 rounded-md" data-lenis-prevent>
        {children}
      </ScrollArea>
    </div>
  );
}