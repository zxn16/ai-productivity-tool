import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';

type WeeklyGoal = {
    id: number;
    title: string;
    occurrences: number;
    fixedSlots: { day: string; hour: number }[];
};

const hours = Array.from({ length: 12 }, (_, i) => i + 12); // 12–23

type AssignedTaskMap = {
    [date: string]: {
        [hour: number]: string;
    };
};

type CalendarProps = {
    todos: { id: number; text: string }[];
    weeklyGoals: WeeklyGoal[];
};

const CalendarView: React.FC<CalendarProps> = ({ todos, weeklyGoals }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [assignedTasks, setAssignedTasks] = useState<AssignedTaskMap>({});
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedTask, setSelectedTask] = useState('');

    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const currentDay = format(selectedDate, 'EEEE');

    useEffect(() => {
        const stored = localStorage.getItem('assignedTasks');
        if (stored) setAssignedTasks(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem('assignedTasks', JSON.stringify(assignedTasks));
    }, [assignedTasks]);

    const handlePreviousDay = () => {
        setSelectedDate(prev => subDays(prev, 1));
        setSelectedHour(null);
    };

    const handleNextDay = () => {
        setSelectedDate(prev => addDays(prev, 1));
        setSelectedHour(null);
    };

    const handleAssign = () => {
        if (selectedHour === null) return;

        setAssignedTasks(prev => {
            const updated = { ...prev };
            if (!updated[dateKey]) updated[dateKey] = {};

            if (selectedTask === '') {
                delete updated[dateKey][selectedHour];
            } else {
                updated[dateKey][selectedHour] = selectedTask;
            }

            return updated;
        });

        setSelectedHour(null);
        setSelectedTask('');
    };

    const getSlotTask = (hour: number): string => {
        for (const goal of weeklyGoals) {
            if (goal.fixedSlots.some(slot => slot.day === currentDay && slot.hour === hour)) {
                return `🔒 ${goal.title}`;
            }
        }
        return assignedTasks[dateKey]?.[hour] || 'No tasks';
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">📅 Daily Calendar</h2>
                <div className="flex items-center gap-2">
                    <button onClick={handlePreviousDay} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">⬅️</button>
                    <span className="text-md font-medium">{format(selectedDate, 'EEEE, d MMM yyyy')}</span>
                    <button onClick={handleNextDay} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">➡️</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {hours.map(hour => (
                    <div
                        key={hour}
                        className="border rounded-lg p-2 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                        onClick={() => setSelectedHour(hour)}
                    >
                        <strong>{hour}:00</strong>
                        <div className="text-sm text-gray-600">{getSlotTask(hour)}</div>

                        {selectedHour === hour && (
                            <div className="mt-2 flex items-center gap-2">
                                <select
                                    value={selectedTask}
                                    onChange={e => setSelectedTask(e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="">❌ Unassign task</option>
                                    {todos.map((task, idx) => (
                                        <option key={idx} value={task.text}>{task.text}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAssign}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Assign
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
