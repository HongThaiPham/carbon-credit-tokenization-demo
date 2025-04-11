"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRwaTokenCreated from "@/hooks/useRwaTokenCreated";
import React from "react";
import { useController } from "react-hook-form";

const MintSelect = () => {
  const { data } = useRwaTokenCreated();

  const { field, formState } = useController({
    name: "mint",
  });

  return (
    <Select
      disabled={formState.disabled}
      key={field.value}
      value={field.value.toString()}
      defaultValue={field.value.toString()}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Token mint" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem
            key={item.rwaMint}
            value={item.rwaMint}
            className="capitalize"
          >
            {item.rwaMint}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MintSelect;
