"use client";

import { useMemo } from "react";

type Slot = {
  dayOffset: number;
  label: string;
  hour: number;
};

const SLOTS: Slot[] = [
  { dayOffset: 0, label: "Today", hour: 19 },
  { dayOffset: 1, label: "Tomorrow", hour: 18 },
  { dayOffset: 2, label: "Beginner", hour: 18 },
];

function getSofiaNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Sofia" }));
}

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function AvailabilityTeaser() {
  const rows = useMemo(() => {
    const now = getSofiaNow();

    return SLOTS.map((slot) => {
      const slotDate = new Date(now);
      slotDate.setDate(slotDate.getDate() + slot.dayOffset);
      slotDate.setHours(slot.hour, 0, 0, 0);

      if (slotDate <= now) {
        slotDate.setDate(slotDate.getDate() + 1);
      }

      const weekday = slotDate.toLocaleDateString("en-GB", {
        timeZone: "Europe/Sofia",
        weekday: "short",
      });

      return {
        label: slot.label,
        value: `${weekday} ${formatHour(slot.hour)}`,
      };
    });
  }, []);

  return (
    <div className="availability-teaser" aria-live="polite">
      {rows.map((row) => (
        <div key={row.label}>
          <span>{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}
