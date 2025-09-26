import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import CalendarView from './components/CalendarView';
import TodoList from './components/TodoList';
import WeeklyGoals from './components/WeeklyGoals.tsx';

// ✅ Paste this here — inline type
type WeeklyGoal = {
    id: number;
    title: string;
    occurrences: number;
    fixedSlots: { day: string; hour: number }[];
};

function App() {
    const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
    const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) setTodos(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todos));
    }, [todos]);

    return (
        <DashboardLayout>
            <WeeklyGoals setWeeklyGoals={setWeeklyGoals} />
            <CalendarView todos={todos} weeklyGoals={weeklyGoals} />
            <TodoList todos={todos} setTodos={setTodos} />
        </DashboardLayout>
    );
}

export default App;
