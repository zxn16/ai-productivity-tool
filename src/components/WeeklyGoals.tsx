import React, { useState, useEffect } from 'react';

export interface WeeklyGoal {
    id: number;
    title: string;
    occurrences: number;
    fixedSlots: { day: string; hour: number }[];
}



const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type WeeklyGoalsProps = {
    setWeeklyGoals: (goals: WeeklyGoal[]) => void;
};

const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ setWeeklyGoals }) => {
    const [goals, setGoals] = useState<WeeklyGoal[]>([]);
    const [title, setTitle] = useState('');
    const [occurrences, setOccurrences] = useState(1);
    const [fixedDay, setFixedDay] = useState('Monday');
    const [fixedHour, setFixedHour] = useState(12);
    const [fixedSlots, setFixedSlots] = useState<{ day: string; hour: number }[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('weeklyGoals');
        if (stored) {
            const parsed = JSON.parse(stored);
            setGoals(parsed);
            setWeeklyGoals(parsed);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('weeklyGoals', JSON.stringify(goals));
        setWeeklyGoals(goals);
    }, [goals]);

    const addFixedSlot = () => {
        if (fixedSlots.length >= occurrences) return;
        setFixedSlots(prev => [...prev, { day: fixedDay, hour: fixedHour }]);
    };

    const addGoal = () => {
        if (!title.trim()) return;
        const newGoal: WeeklyGoal = {
            id: Date.now(),
            title,
            occurrences,
            fixedSlots,
        };
        setGoals(prev => [...prev, newGoal]);
        setTitle('');
        setOccurrences(1);
        setFixedSlots([]);
    };

    const deleteGoal = (id: number) => {
        setGoals(prev => prev.filter(goal => goal.id !== id));
    };

    return (
        <div className="p-4 border rounded mb-4 bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">🎯 Weekly Goals</h2>

            <div className="flex flex-col gap-2 mb-4">
                <input
                    type="text"
                    placeholder="e.g., Quran class"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border px-2 py-1 rounded"
                />

                <div className="flex items-center gap-2">
                    <label>Times per week:</label>
                    <input
                        type="number"
                        min={1}
                        value={occurrences}
                        onChange={e => setOccurrences(Number(e.target.value))}
                        className="border px-2 py-1 w-16 rounded"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label>Fixed slot:</label>
                    <select value={fixedDay} onChange={e => setFixedDay(e.target.value)} className="border rounded px-2 py-1">
                        {daysOfWeek.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min={0}
                        max={23}
                        value={fixedHour}
                        onChange={e => setFixedHour(Number(e.target.value))}
                        className="border px-2 py-1 w-16 rounded"
                    />
                    <button onClick={addFixedSlot} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                        Add Slot
                    </button>
                </div>

                {fixedSlots.length > 0 && (
                    <div className="text-sm text-gray-700 ml-2 mb-2">
                        <p className="font-medium">Selected fixed slots:</p>
                        <ul className="list-disc pl-5">
                            {fixedSlots.map((slot, idx) => (
                                <li key={idx}>{slot.day} @ {slot.hour}:00</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button onClick={addGoal} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                    Add Goal
                </button>
            </div>

            <ul>
                {goals.map(goal => (
                    <li key={goal.id} className="mb-3">
                        <strong>{goal.title}</strong> – {goal.occurrences}x/week
                        {goal.fixedSlots.length > 0 && (
                            <div className="text-sm text-gray-600 ml-2">
                                {goal.fixedSlots.map((slot, i) => (
                                    <div key={i}>• {slot.day} @ {slot.hour}:00</div>
                                ))}
                            </div>
                        )}
                        <button onClick={() => deleteGoal(goal.id)} className="ml-2 text-red-500 hover:underline text-sm">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default WeeklyGoals;
