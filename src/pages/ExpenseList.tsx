import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from "react";
import { getFormattedDate } from '@/utils/dateFormatter';
import { Card, CardContent } from '@/components/ui/card';

interface Expense {
    dateInWords: string,
    date: string,
    amount: number,
    description: string
}

const ExpenseList = () => {
    const [expenseList, setExpenseList] = useState<Expense[]>([]);

    useEffect(() => {
        createExpenseList();
    }, [])

    function createExpenseList() {
        const expenses = [];

        for (let item in localStorage) {
            if (item.startsWith('e-')) {
                expenses.push(JSON.parse(localStorage[item]))
            }
        }

        for (const expense of expenses) {
            expense.dateInWords = getFormattedDate(expense.date);
        }

        setExpenseList(expenses);
    }

    return (
        <Card className="w-[100%] h-[100%]">
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            (expenseList && expenseList.length > 0) ?
                                expenseList.map((expenseItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>

                                            <TableCell>
                                                {expenseItem.dateInWords}
                                            </TableCell>

                                            <TableCell>
                                                {expenseItem.amount}
                                            </TableCell>

                                            <TableCell>
                                                {expenseItem.description}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) :
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center italic text-[grey]">
                                        No expenses found.
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ExpenseList;