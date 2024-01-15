import { forwardRef, useState, useMemo } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";
import { ClipboardType } from "lucide-react";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationsearchInput, setLocationSearchInput] = useState("");

    const [hasFocus, sethasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationsearchInput.trim()) return [];

      const searchWords = locationsearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationsearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationsearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => sethasFocus(true)}
          onBlur={() => sethasFocus(false)}
          {...props}
          ref={ref}
        />
        {locationsearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
                className="block w-full p-2 text-start"
                key={city}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
