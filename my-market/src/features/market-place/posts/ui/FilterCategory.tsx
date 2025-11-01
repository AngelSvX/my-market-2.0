import { Select } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/providers/store";
import { useEffect } from "react";
import { fetchCategories } from "../../categories/model/thunks";
import { selectCategory } from "../../categories/model/slice";

function FilterCategory() {
  const { categories, categorySelected } = useSelector(
    (state: RootState) => state.categories
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-sm font-semibold text-gray-500 mb-2">
        Categoría
      </label>
      <div className="relative">
        <Select
          className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition-all cursor-pointer h-12"
          value={categorySelected || ""}
          onChange={(e) => {
            dispatch(selectCategory(e.target.value));
          }}
        >
          <option value="">Selecciona la categoría</option>
          {categories.map((option) => (
            <option key={option.id} value={option.name} className="py-2">
              {option.name}
            </option>
          ))}
        </Select>
        <ChevronDown className="pointer-events-none absolute right-3 top-4 h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
}

export default FilterCategory;
