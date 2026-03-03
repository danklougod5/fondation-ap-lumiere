import React from 'react';
import { X, Plus } from 'lucide-react';

const ActionDynamicLists = ({
    objectives,
    newObjective,
    setNewObjective,
    addObjective,
    removeObjective,
    upcomingProjects,
    newProject,
    setNewProject,
    addProject,
    removeProject
}) => {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Objectives List */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Objectifs</h2>
                <ul className="space-y-3 mb-6">
                    {objectives.map((obj) => (
                        <li key={obj} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                            <span className="flex-1 text-sm font-medium text-gray-700">{obj}</span>
                            <button type="button" onClick={() => removeObjective(objectives.indexOf(obj))} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                        placeholder="Nouvel objectif..."
                        className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <button type="button" onClick={addObjective} className="bg-gray-900 text-white p-2 rounded-xl hover:bg-black"><Plus size={20} /></button>
                </div>
            </div>

            {/* Upcoming Projects List */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Projets en Cours</h2>
                <ul className="space-y-3 mb-6">
                    {upcomingProjects.map((proj) => (
                        <li key={proj} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                            <span className="flex-1 text-sm font-medium text-gray-700">{proj}</span>
                            <button type="button" onClick={() => removeProject(upcomingProjects.indexOf(proj))} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProject())}
                        placeholder="Nouveau projet en cours..."
                        className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <button type="button" onClick={addProject} className="bg-gray-900 text-white p-2 rounded-xl hover:bg-black"><Plus size={20} /></button>
                </div>
            </div>
        </div>
    );
};

export default ActionDynamicLists;
