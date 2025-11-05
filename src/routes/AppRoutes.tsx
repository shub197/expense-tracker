import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import AddExpense from '@/pages/AddExpense';
import ExpenseList from '@/pages/ExpenseList';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expense-list" element={<ExpenseList />} />
        </Routes>
    )
}

export default AppRoutes;