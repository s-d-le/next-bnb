"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // calendar style file
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()} //today
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false} //ugly
      minDate={new Date()} //no past days
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
