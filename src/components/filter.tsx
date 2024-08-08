import React from "react";
import { Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/date-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckboxGroup from "@/components/checkbox-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterProps {
  sources: string[];
  categories: string[];
  authors: string[];
  selectedSources: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  setSelectedSources: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const FilterComponent: React.FC<FilterProps> = ({
  sources = [],
  categories = [],
  authors = [],
  selectedSources = [],
  selectedCategories = [],
  selectedAuthors = [],
  startDate,
  endDate,
  setSelectedSources,
  setSelectedCategories,
  setSelectedAuthors,
  setStartDate,
  setEndDate,
}) => {
  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open Filter">
          <FilterIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:min-w-[450px] min-w-full">
        <SheetHeader>
          <SheetTitle>Customize your news feed</SheetTitle>
          <SheetDescription>Select your preferences</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100dvh-130px)] w-90 rounded-md border mt-4">
          <div className="p-4 pt-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="sources">
                <AccordionTrigger>Sources</AccordionTrigger>
                <AccordionContent>
                  <CheckboxGroup
                    label="Sources"
                    items={sources}
                    selectedItems={selectedSources}
                    onChange={handleCheckboxChange(setSelectedSources)}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <CheckboxGroup
                    label="Categories"
                    items={categories}
                    selectedItems={selectedCategories}
                    onChange={handleCheckboxChange(setSelectedCategories)}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="authors">
                <AccordionTrigger>Authors</AccordionTrigger>
                <AccordionContent>
                  <CheckboxGroup
                    label="Authors"
                    items={authors}
                    selectedItems={selectedAuthors}
                    onChange={handleCheckboxChange(setSelectedAuthors)}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="date-range">
                <AccordionTrigger>Date Range</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <DatePicker
                      label="Start Date"
                      date={startDate}
                      setDate={setStartDate}
                    />
                    <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

const Filter = React.memo(FilterComponent);

export default Filter;
