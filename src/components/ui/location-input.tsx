import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

// Import JSON data directly
import countries from '@/data/countries.json';

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

interface CountryProps {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: Record<string, string>;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

interface LocationSelectorProps {
  value: string;
  disabled?: boolean;
  onCountryChange?: (country: CountryProps | null) => void;
}

const LocationSelector = ({ value, disabled, onCountryChange }: LocationSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(
    countries.find((country) => country.name.toLowerCase() === value.toLowerCase()) as CountryProps,
  );

  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);

  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[];

  const handleCountrySelect = (country: CountryProps | null) => {
    setSelectedCountry(country);
    onCountryChange?.(country);
  };

  return (
    <div className="flex gap-4">
      <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={openCountryDropdown} disabled={disabled} className="w-full justify-between">
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span>{selectedCountry.emoji}</span>
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              <span>Select Country...</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <ScrollArea className="h-72">
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countriesData.map((country) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      onSelect={() => {
                        handleCountrySelect(country);
                        setOpenCountryDropdown(false);
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span>{country.emoji}</span>
                        <span>{country.name}</span>
                      </div>
                      <Check className={cn('h-4 w-4', selectedCountry?.id === country.id ? 'opacity-100' : 'opacity-0')} />
                    </CommandItem>
                  ))}
                  <ScrollBar orientation="vertical" />
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
