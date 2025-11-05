import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setExpenseDate } from '@/store/slices/expenseDateSlice';
import { getFormattedDate } from '@/utils/dateFormatter';

function checkIfDateIsValidOrNot(date: Date | undefined) {
    return date ? !isNaN(date.getTime()) : false;
}

interface bindings {
    value?: Date | null,
    onChange?: (value: string | Date | null) => void
    required?: boolean | false,
    reference?: React.RefObject<HTMLInputElement | null>
}

const DateTimePicker: React.FC<bindings> = ({ required, onChange, value, reference }) => {
    const [showCalendar, setShowCalendarValue] = useState(false);
    const [date, setDate] = useState<Date | undefined | null>(new Date());
    const [month, setMonth] = useState<Date | undefined | null>(date);
    const [formattedDateInputValue, setFormattedDateInputValue] = useState(getFormattedDate(date));

    const dispatch = useAppDispatch();

    useEffect(() => {
        const actualDate: Date | undefined = date ? date : undefined;
        const dateString = (actualDate && checkIfDateIsValidOrNot(actualDate)) ? actualDate.toISOString() : null;
        dispatch(setExpenseDate(dateString))
    }, [date])

    useEffect(() => {
        if (!value) {
            if (date && checkIfDateIsValidOrNot(date)) {
                value = date;
                onChange?.(date);
            } else {
                setDate(null)
                onChange?.(null);
                setMonth(null);
            }
        } else {
            if (value && value instanceof Date && checkIfDateIsValidOrNot(value) &&
                (!date || value.getTime() != date.getTime())
            ) {
                setDate(value);
                setFormattedDateInputValue(getFormattedDate(value));
                onChange?.(value)
            }
        }
    }, [value])

    function onDateTimePickerInputClick(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key == 'Enter') {
            event.preventDefault();
            setShowCalendarValue(true);
        }
    }

    function onDateInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const dateFromInputField = new Date(event.target.value);
        setFormattedDateInputValue(event.target.value);

        setDate(dateFromInputField)
        setMonth(dateFromInputField)
        onChange?.(checkIfDateIsValidOrNot(dateFromInputField) ? dateFromInputField : null)
        value = dateFromInputField;
    }

    function onChangeInCalendar(calendarDate: Date | null) {
        setDate(calendarDate);
        setFormattedDateInputValue(getFormattedDate(calendarDate));
        onChange?.(calendarDate)
        value = calendarDate;
        setShowCalendarValue(false);
    }

    return (
        <div className="flex flex-col">
            <div className="relative flex gap-2">
                <Input
                    ref={reference}
                    value={formattedDateInputValue ? formattedDateInputValue : ''}
                    placeholder="Select Date"
                    className="bg-background pr-10"
                    onKeyDown={(event) => { onDateTimePickerInputClick(event) }}
                    onChange={(event) => { onDateInputChange(event) }}
                    required={required}
                />

                <Popover
                    open={showCalendar}
                    onOpenChange={setShowCalendarValue}
                >
                    <PopoverTrigger asChild>
                        <Button
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2 font-normal"
                            variant="ghost"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select Date</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-auto p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={12}
                    >
                        <div>
                            <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={date ? date : undefined}
                                month={month ? month : undefined}
                                onMonthChange={setMonth}
                                onSelect={(calendarDate) => { onChangeInCalendar(calendarDate ? calendarDate : null) }}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default DateTimePicker;