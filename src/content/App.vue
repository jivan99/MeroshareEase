<script setup>
import CheckIcon from "~icons/radix-icons/check";
import CaretSortIcon from "~icons/radix-icons/caret-sort";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal"
      }
    ]
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc"
      },
      {
        label: "Monsters Inc.",
        value: "monsters"
      }
    ]
  }
];

const open = ref(false);
const selectedTeam = ref(groups[0].teams[0]);

function onUserSelection(team) {
  selectedTeam.value = team;
  open.value = false;
}
</script>

<template>
  <div class="w-[300px] h-[600px]">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="open"
          aria-label="Select a team"
          :class="cn('w-[200px] justify-between', $attrs.class ?? '')"
        >
          <Avatar class="mr-2 h-5 w-5">
            <AvatarImage
              :src="`https://avatar.vercel.sh/${selectedTeam.value}.png`"
              :alt="selectedTeam.label"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {{ selectedTeam.label }}
          <CaretSortIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command
          :filter-function="
            (list, term) =>
              list.filter((i) => i.label?.toLowerCase()?.includes(term))
          "
        >
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup
              v-for="group in groups"
              :key="group.label"
              :heading="group.label"
            >
              <CommandItem
                v-for="team in group.teams"
                :key="team.value"
                :value="team"
                class="text-sm"
                @select="onUserSelection(team)"
              >
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage
                    :src="`https://avatar.vercel.sh/${team.value}.png`"
                    :alt="team.label"
                    class="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {{ team.label }}
                <CheckIcon
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      selectedTeam.value === team.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
