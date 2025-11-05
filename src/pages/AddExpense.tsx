import '@/styles/add-expense.scss';
import DateTimePicker from '@/components/system/date-time-picker';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { IndianRupee } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm, type SubmitHandler, useController } from 'react-hook-form';
import { toast } from 'sonner';
import { useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface formFieldsProperties {
    id: string,
    date: string,
    amount: number,
    description: string
}

const AddExpense = () => {
    const { register, control, handleSubmit, reset, formState: { isValid } } =
        useForm<formFieldsProperties>({ mode: 'onChange' })

    const dateFieldReference = useRef<HTMLInputElement | null>(null);

    function setFocusOnDateField() {
        if (dateFieldReference && dateFieldReference.current) dateFieldReference.current.focus();
    }

    useEffect(() => {
        setFocusOnDateField();
    }, [dateFieldReference])

    const onSubmit: SubmitHandler<formFieldsProperties> = (data) => {
        const expenseId = `e-${crypto.randomUUID()}`;
        data.id = expenseId;
        localStorage.setItem(expenseId, JSON.stringify(data));

        toast.success('Expense added successfully!',
            { className: '!text-[#fafafa] !bg-green-700 !text-[15px]' }
        )

        reset();
        setFocusOnDateField();
    }

    const { field: expenseDateField } = useController({
        name: 'date',
        control,
        rules: { required: true }
    })

    return (
        <Card className="w-[100%] h-[100%]">
            <CardContent className="expense-form">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    name="addExpenseForm"
                >
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <Field className="gap-[4px]">
                                    <FieldLabel className="gap-[unset]">
                                        Date<span className="required-field">*</span>
                                    </FieldLabel>

                                    <DateTimePicker
                                        {...expenseDateField}
                                        reference={dateFieldReference}
                                        required={true}
                                        onChange={(date) => expenseDateField.onChange(date)}
                                        value={expenseDateField.value ? new Date(expenseDateField.value) : null}
                                    />
                                </Field>

                                <Field className="gap-[4px]">
                                    <FieldLabel className="gap-[unset]">
                                        Amount<span className="required-field">*</span>
                                    </FieldLabel>

                                    <InputGroup>
                                        <InputGroupAddon className="pt-[11px]">
                                            <IndianRupee strokeWidth={2} viewBox="0 0 30 30" />
                                        </InputGroupAddon>

                                        <InputGroupInput
                                            {...register('amount', { required: true })}
                                            autoComplete="off"
                                            className="!pl-[3px]"
                                            type="number"
                                            placeholder="0.00"
                                            required={true}
                                        />
                                    </InputGroup>
                                </Field>

                                <Field className="gap-[4px]">
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea
                                        {...register('description')}
                                        placeholder="Type description here."
                                    />
                                </Field>
                            </FieldGroup>

                            <Button
                                type="submit"
                                disabled={!isValid}
                                className="w-fit m-[auto] cursor-pointer"
                            >
                                Add Expense
                            </Button>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddExpense;