import { Dumbbell, Info } from "lucide-react";
import type { DaySchedule, Exercise } from "../../types";
import { Card } from "../ui/Card";

function ExerciseRow({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-3 pr-4">
        <div className="flex items-start gap-3">
          <span className="text-xs text-muted w-5">{index + 1}.</span>
          <div>
            <p className="font-medium">{exercise.name}</p>
            {exercise.notes && (
              <p className="text-cs text-muted mt-0.5 flex items-center">
                <Info className="w-3 h-3" />
                {exercise.notes}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="py-3 px-4 text-center whitespace-nowrap">
        <span className="text-accent font-medium">{exercise.sets}</span>
        <span className="text-muted"> x </span>
        <span>{exercise.reps}</span>
      </td>

      <td className="py-3 px-4 text-center">
        <span className="text-muted">{exercise.rest}</span>
      </td>
      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium ${exercise.rpe >= 8 ? `bg-red-500/10 text-red-400` : exercise.rpe >= 7 ? `bg-yellow-500/10 text-yellow-400` : `bg-green-500/10 text-green-400`}`}
        >
          {exercise.rpe}
        </span>
      </td>
    </tr>
  );
}

function DayCard({ schedule }: { schedule: DaySchedule }) {
  return (
    <Card variant="bordered" className="overflow-hidden">
      <div>
        <div>
          <h3 className="font-semibold text-lg">{schedule.day}</h3>
          <p className="text-sm text-accent">{schedule.focus}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Dumbbell className="w-4 h-4" />
          <span>{schedule.exercises.length} exercises</span>
        </div>
      </div>

      <div className="overflow-auto -mx-6 px-6">
        <table>
          <thead>
            <tr className="text-muted text-cs uppercase tracking-wide">
              <th className="text-left py-2 pr-4 font-medium">Exercise</th>
              <th className="text-left py-2 pr-4 font-medium">Sets x Reps</th>
              <th className="text-left py-2 pr-4 font-medium">Rest</th>
              <th className="text-left py-2 pr-4 font-medium">RPE</th>
            </tr>
          </thead>

          <tbody>
            {schedule.exercises.map((exercise, key) => (
              <ExerciseRow exercise={exercise} index={key} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface PlanDisplayProps {
  weeklySchedule: DaySchedule[];
}

export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
  return (
    <div className="space-y-6 mb-8">
      {weeklySchedule.map((schedule, key) => (
        <DayCard key={key} schedule={schedule} />
      ))}
    </div>
  );
}
